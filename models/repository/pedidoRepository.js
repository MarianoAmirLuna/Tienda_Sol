export class PedidoRepository {

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
            (unPedido) => unPedido.getId() === id
        );
        return pedido ?? null;
    }

    actualizar(id, pedidoActualizado) {
        if(pedidoActualizado == null) return null;

        const indice = this.pedidos.findIndex((pedido) => pedido.getId() === id);

        if (indice === -1) return null;

        this.pedidos[indice] = pedidoActualizado;

        return pedidoActualizado;
    }

    historialPedidos(id) {
        return this.getPedidos().filter(pedido => pedido.getComprador() === id);
    }

}