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


    findById(id) {
        const pedido = this.pedidos.find(
            (unPedido) => unPedido.getId() === id
        );
        return pedido ?? null;
    }

    actualizar(id, pedidoActualizado) {
        if(pedidoActualizado == null) return null;

        const indice = this.obtenerIndicePorID(id);

        if (indice === -1) return null;

        this.pedidos[indice] = pedidoActualizado;

        return pedidoActualizado;
    }

    delete(id){
        const indice = this.obtenerIndicePorID(id);
        if(indice === -1) return null;
        const [pedidoEliminado] = this.pedidos.splice(indice, 1);//borra desde indice la cantidad de elementos que indiques.
        console.log(pedidoEliminado);
        return pedidoEliminado;
    }

    obtenerIndicePorID(id){
        console.log(this.pedidos);
        this.pedidos.forEach(p => console.log(p.getId()));
        return this.pedidos.findIndex((pedido) => pedido.getId() === id);
    }

    //TODO: Esto es equivalente a traerte toda la BD, Esta mal mantenerlo a futuro
    getPedidos() {
        return this.pedidos;
    }

    historialPedidos(id) {
        console.log("param historialPedidos : "+id);
        return Promise.resolve(this.getPedidos().filter(pedido => pedido.getCompradorID() == id));
    }

}