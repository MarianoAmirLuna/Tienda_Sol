import { NotFoundError } from "../middleware/appError.js";
import {
  NotificacionPedido,
  Notificacion,
  NotificacionEstadoPedido,
  NotificacionCancelacionPedido,
} from "../models/entities/notificacion/notificacion.js";
import { EstadoPedido } from "../models/entities/pedido/estadoPedido.js";
import { PedidoModel } from "../schemasDB/pedidoSchema.js";

export class PedidoService {
  constructor(pedidoRepository, productoService, notificacionService) {
    this.pedidoRepository = pedidoRepository;
    this.productoService = productoService;
    this.notificacionService = notificacionService;
    this.pedidoSchema = PedidoModel;
  }

  async getPrecioUnitario(productoID) {
    const producto = await this.productoService.obtenerProducto(productoID);
    return producto ? producto.getPrecio() : null;
  }

  async actualizarStockProductosPorVenta(pedido) {
    await Promise.all(
      pedido.getItemsPedido().map((item) => {
        this.productoService.actualizarStock(
          item.productoID,
          item.cantidad,
          (producto, cantidad) => producto.reducirStock(cantidad)
        );
      })
    );
  }

  async actualizarStockProductosPorCancelacion(pedido) {
    await Promise.all(
      pedido.getItemsPedido().map((item) => {
        this.productoService.actualizarStock(
          item.productoID,
          item.cantidad,
          (producto, cantidad) => {
            producto.aumentarStock(cantidad);
            producto.reducirUnidadesVendidas(cantidad);
          }
        );
      })
    );
  }

  async getIdVendedor(pedido) {
    const idPrimerProducto = pedido.getItemsPedido()[0].productoID;

    console.log("el id del primer producto: ", idPrimerProducto);

    const producto = await this.productoService.obtenerProducto(
      idPrimerProducto
    );

    //console.log(JSON.stringify(producto, null, 2));
    console.log(producto);

    return producto.vendedor;
  }

  async crearPedido(pedido) {
    await this.actualizarStockProductosPorVenta(pedido);

    const nuevoPedido = await this.pedidoRepository.create(pedido);

    const idVendedor = await this.getIdVendedor(pedido);

    console.log("la id del vendedor: ", idVendedor);

    await this.notificacionService.crearNotificacion(
      new Notificacion(idVendedor, "hola soy un mensaje de notificacion")
    );

    //usuarioDestino
    //mensaje

    return nuevoPedido;
  }

  async listarPedidos(page, limit) {
    const pedidos = await this.pedidoRepository.findAll(page, limit);
    return pedidos || [];
  }

  async obtenerPedido(idPedido) {
    const pedido = await this.pedidoRepository.findById(idPedido);
    if (!pedido) {
      throw new NotFoundError(`${idPedido}`);
    }
    return pedido;
  }

  async eliminarPedido(id) {
    const pedido = await this.pedidoRepository.delete(id);
    if (!pedido) {
      throw new NotFoundError(`${id}`);
    }
    return pedido;
  }

  async actualizarEstado(id, nuevoEstado) {
    const pedido = await this.obtenerPedido(id);

    if (!pedido) throw new NotFoundError(`${id}`);

    const estadoAnterior = pedido.estado;

    pedido.cambiarEstado(nuevoEstado);

    this.notificacionService.crearNotificacion(
      new NotificacionEstadoPedido(
        pedido.compradorID,
        pedido.id,
        nuevoEstado,
        estadoAnterior
      )
    );

    if (nuevoEstado === EstadoPedido.CANCELADO) {
      const idVendedor = await this.getIdVendedor(pedido);
      await this.actualizarStockProductosPorCancelacion(pedido);
      this.notificacionService.crearNotificacion(
        new NotificacionCancelacionPedido(
          idVendedor,
          pedido.id,
          pedido.compradorID
        )
      );
    }

    await this.pedidoRepository.actualizar(id, pedido);
    return pedido;
  }

  async historialPedido(idCliente, page, limit) {
    return await this.pedidoRepository.historialPedidos(idCliente, page, limit);
  }
}
