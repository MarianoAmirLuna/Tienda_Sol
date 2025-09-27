import {EstadoPedido} from "../models/entities/pedido/estadoPedido.js";

const transicionesPermitidas = {
    [EstadoPedido.PENDIENTE]: [EstadoPedido.CONFIRMADO, EstadoPedido.CANCELADO, EstadoPedido.ENVIADO],
    [EstadoPedido.CONFIRMADO]: [EstadoPedido.EN_PREPARACION, EstadoPedido.CANCELADO, EstadoPedido.ENVIADO],
    [EstadoPedido.EN_PREPARACION]: [EstadoPedido.ENVIADO, EstadoPedido.CANCELADO],
    [EstadoPedido.ENVIADO]: [EstadoPedido.ENTREGADO],
    [EstadoPedido.ENTREGADO]: [],
    [EstadoPedido.CANCELADO]: []
};

export class PedidoService {
    constructor(pedidoRepository, productoService) {
        this.pedidoRepository = pedidoRepository;
        this.productoService = productoService;
    }

    async getPrecioUnitario(productoID) {
        const producto = await this.productoService.obtenerProducto(productoID);
        return producto ? producto.getPrecio() : null;
    }


    async actualizarStockProductos(pedido) {
        await Promise.all(
            pedido.getItemsPedido().map(item =>
                this.productoService.actualizarStock(item.productoID, item.cantidad)
            )
        );
    }

    async crearPedido(pedido) {

        await this.actualizarStockProductos(pedido);

        return await this.pedidoRepository.create(pedido);
    }


    /// hasta aca todo ok, se lanza el error de stock desde el mismo producto falta seguir de aca para abajo

    //#############
    //CREATE pedido
    //#############

    //#############
    //RETRIEVE pedido
    //#############

    async listarPedidos() {
        return await this.pedidoRepository.getPedidos();
    }

    async obtenerPedido(idPedido) {
        const pedido = await this.pedidoRepository.findById(idPedido);
        return pedido;
    }

    //#############
    //RETRIEVE pedido
    //#############

    //#############
    //UPDATE pedido
    //#############

    puedeCancelarPedido(pedido) {
        const estadosPermitidos = [
            EstadoPedido.PENDIENTE,
            EstadoPedido.CONFIRMADO,
            EstadoPedido.EN_PREPARACION
        ];
        return estadosPermitidos.includes(pedido.getEstado());
    }

    async cancelarPedido(pedido) {
        if (!this.puedeCancelarPedido(pedido)) {
            return null;
        }

        pedido.cambiarEstado(EstadoPedido.CANCELADO);
        await this.pedidoRepository.actualizar(pedido);
        return pedido;
    }


    async puedeEnviarPedido(pedido) {

        const items = pedido.getItemsPedido();
        if (!items) {
            return false;
        }

        const estadosPermitidos = [
            EstadoPedido.PENDIENTE,
            EstadoPedido.CONFIRMADO,
            EstadoPedido.EN_PREPARACION
        ];

        const productos = await Promise.all(
            items.map((item) => this.productoRepository.findById(item.getProductoID()))
        );

        const todosExisten = productos.every((p) => p);
        const estadoValido = estadosPermitidos.includes(pedido.getEstado());
        const mismoVendedor = productos.every(
            (p) => p.getVendedorID() === productos[0].getVendedorID()
        );

        return todosExisten && estadoValido && mismoVendedor;
    }

    async enviarPedido(pedido) {
        if (!this.puedeEnviarPedido(pedido)) {
            return null;
        }

        pedido.cambiarEstado(EstadoPedido.ENVIADO);
        await this.pedidoRepository.actualizar(pedido);
        return pedido;
    }

    async cambiarEstado(id, estado){

        const pedido = await this.obtenerPedido(id);
        if (!pedido) {
            return -1;
        }

        const estadoActual = pedido.getEstado();

        if (!(transicionesPermitidas)[estadoActual].includes(estado)) {
            return null;
        }

        if(estado === EstadoPedido.ENVIADO){
            return await this.enviarPedido(pedido);
        }
        if(estado === EstadoPedido.CANCELADO){
            return await this.cancelarPedido(pedido);
        }
    }

    //#############
    //UPDATE pedido
    //#############

    //#############
    //DELETE pedido
    //#############

    async delete(id){
        return await this.pedidoRepository.delete(id);
    }


    //#############
    //DELETE pedido
    //#############

    historialPedido(idPedido) {
        return this.pedidoRepository.historialPedidos(idPedido);
    }
}
