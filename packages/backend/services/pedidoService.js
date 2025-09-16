import { EstadoPedido } from "../models/entities/pedido/estadoPedido.js";

export class PedidoService {
  constructor(pedidoRepo, productoRepo) {
    this.pedidoRepo = pedidoRepo;
    this.productoRepo = productoRepo;
  }

  crearPedido(pedido) {
    if (!this.hayStockTodosProductos(pedido)) {
      //TODO:revisar los errores cuando no hay stock
      return;
    }

    this.actualizarStockProductos(pedido);

    return this.pedidoRepo.create(pedido);
  }

  listarPedidos() {
    return this.pedidoRepo.getPedidos();
  }

  hayStockTodosProductos(pedido) {
    return pedido
      .getItems()
      .every((item) =>
        this.productoRepo.hayStockProducto(item.producto, item.cantidad)
      );
  }

  actualizarStockProductos(pedido) {
    pedido
      .getItems()
      .forEach((item) =>
        this.productoRepo.actualizarStock(item.producto, item.cantidad)
      );
  }

  obtenerPedido(idPedido) {
    const pedido = this.pedidoRepo.findById(idPedido);
    return pedido;
  }

  puedeCancelarPedido(pedido) {
    let estadoPedido = pedido.getEstado();

    return (
      estadoPedido == estadoPedido.PENDIENTE ||
      estadoPedido == estadoPedido.CONFIRMADO ||
      estadoPedido == estadoPedido.EN_PREPARACION
    );
  }

  cancelarPedido(pedido){
    pedido.cambiarEstado(EstadoPedido.CANCELADO);
  }

  puedeEnviarPedido(pedido) {
    const items = pedido.getItems() || [];

    if (items.length === 0) return false;

    const primerProducto = this.productoRepo.findById(items[0]?.getProducto());
    if (!primerProducto) return false;

    const idPrimerVendedor = primerProducto.getVendedorID();

    return items.every((itemPedido) => {
      const producto = this.productoRepo.findById(itemPedido?.getProducto());
      return producto?.getVendedorID() === idPrimerVendedor;
    });
  }

  enviarPedido(pedido) {
    pedido.cambiarEstado(EstadoPedido.ENVIADO);
  }
}
