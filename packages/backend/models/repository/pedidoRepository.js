

export class PedidoRepository{

    constructor() {
    this.pedidos = [];
    this.id = 1;
  }

  create(pedido) {
    pedido.setId(this.id);
    this.id++;
    this.pedidos.push(pedido);
    return pedido;
  }

  getPedidos() {
    return this.pedidos;
  }

  findById(id) {
    const pedido = this.pedidos.find(
      (unPedido) => unPedido.getId() == id
    );
    return pedido ?? null;
  }

  historialPedidos(id){
    return this.getPedidos().filter(pedido => pedido.getComprador() == id);
  }

}