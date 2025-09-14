
export class PedidoService {
  constructor(pedidoRepo, productoRepo) {
    this.pedidoRepo = pedidoRepo;
    this.productoRepo = productoRepo;
  }

  crearPedido(pedido) {
    pedido
      .getItems()
      .every((item) =>
        this.productoRepo.hayStockProducto(item.producto, item.cantidad)
      );

    return this.pedidoRepo.create(pedido);
  }

  listarPedidos() {
    return this.pedidoRepo.findAll();
  }

}