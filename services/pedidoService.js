import { EstadoPedido } from "../models/entities/pedido/estadoPedido.js";

export class PedidoService {
  constructor(pedidoRepo, productoRepo) {
    this.pedidoRepo = pedidoRepo;
    this.productoRepo = productoRepo;
  }

  getPrecioUnitario(producto) {
      return this.productoRepo.findById(producto).getPrecio();
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
        const estadosPermitidos = [
            EstadoPedido.PENDIENTE,
            EstadoPedido.CONFIRMADO,
            EstadoPedido.EN_PREPARACION
        ];
        return estadosPermitidos.includes(pedido.getEstado());
    }

    cancelarPedido(pedido){
    pedido.cambiarEstado(EstadoPedido.CANCELADO);
  }

  puedeEnviarPedido(pedido) {

      const items = pedido.getItems() || [];

      const estadosPermitidos = [
          EstadoPedido.PENDIENTE,
          EstadoPedido.CONFIRMADO,
          EstadoPedido.EN_PREPARACION
      ];

      const productos = items.map((item) => this.productoRepo.findById(item.getProducto()));

      return (
          items.length > 0 &&
          !productos.some((p) => !p) &&
          estadosPermitidos.includes(pedido.getEstado()) &&
          productos.every((p) => p.getVendedorID() === productos[0].getVendedorID())
      );
  }

  enviarPedido(pedido) {
    pedido.cambiarEstado(EstadoPedido.ENVIADO);
  }
}
