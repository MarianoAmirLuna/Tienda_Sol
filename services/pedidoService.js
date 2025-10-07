import { NotFoundError } from "../middleware/appError.js";
import {
  NotificacionPedido,
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
    console.log("la id es: ", productoID);
    const producto = await this.productoService.obtenerProducto(productoID);
    console.log("el producto es es: ", producto);
    return producto ? producto.getPrecio() : null;
  }

  async actualizarStockProductos(pedido) {
    await Promise.all(
      pedido
        .getItemsPedido()
        .map((item) =>
          this.productoService.actualizarStock(item.productoID, item.cantidad)
        )
    );
  }

  async getIdVendedor(pedido) {
    const idPrimerProducto = pedido.getItemsPedido()[0].productoID;
    const producto = await this.productoService.obtenerProducto(
      idPrimerProducto
    );

    return producto.vendedorID;
  }

  async crearPedido(pedido) {
    console.log(`log mariano: ${pedido}`);
    await this.actualizarStockProductos(pedido);

    const nuevoPedido = await this.pedidoRepository.create(pedido);

    const idVendedor = await this.getIdVendedor(pedido);

    this.notificacionService.crearNotificacion(
      new NotificacionPedido(idVendedor, nuevoPedido.id, pedido.compradorID)
    );

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
