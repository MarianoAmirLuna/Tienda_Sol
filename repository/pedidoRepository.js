export class PedidoRepository {

    constructor() {
        this.pedidos = [];
        this.id = 1;
    }

    create(pedido) {
        pedido.setId(this.id);
        this.id++;
        this.pedidos.push(pedido);
        return Promise.resolve(pedido);
    }

    findById(id) {
        const pedido = this.pedidos.find(
            (unPedido) => unPedido.getId() === id
        );
        return Promise.resolve(pedido ?? null);
    }

    getPedidos() {
        return Promise.resolve(this.pedidos);
    }

    delete(id){
        const indice = this.obtenerIndicePorID(id);
        if(indice === -1) return Promise.resolve(null);
        const [pedidoEliminado] = this.pedidos.splice(indice, 1);//borra desde indice la cantidad de elementos que indiques.
        return Promise.resolve(pedidoEliminado);
    }

    actualizar(id, pedidoActualizado) {

        if(pedidoActualizado == null) return Promise.resolve(null);

        const indice = this.obtenerIndicePorID(id);

        if (indice === -1) return Promise.resolve(null);

        this.pedidos[indice] = pedidoActualizado;

        return Promise.resolve(pedidoActualizado);
    }

    obtenerIndicePorID(id){
        console.log(this.pedidos);
        this.pedidos.forEach(p => console.log(p.getId()));
        return this.pedidos.findIndex((pedido) => pedido.getId() === id);
    }


    historialPedidos(id) {
        console.log("param historialPedidos : "+id);
        return Promise.resolve(this.getPedidos().filter(pedido => pedido.getCompradorID() == id));
    }

}