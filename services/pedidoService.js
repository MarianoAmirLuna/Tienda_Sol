import {EstadoPedido} from "../models/entities/pedido/estadoPedido.js";

const transicionesPermitidas = {
    [EstadoPedido.PENDIENTE]: [EstadoPedido.CONFIRMADO, EstadoPedido.CANCELADO, EstadoPedido.ENVIADO],
    [EstadoPedido.CONFIRMADO]: [EstadoPedido.EN_PREPARACION, EstadoPedido.CANCELADO, EstadoPedido.ENVIADO],
    [EstadoPedido.EN_PREPARACION]: [EstadoPedido.ENVIADO, EstadoPedido.CANCELADO],
    [EstadoPedido.ENVIADO]: [EstadoPedido.ENTREGADO],
    [EstadoPedido.ENTREGADO]: [],
    [EstadoPedido.CANCELADO]: [] // 👈 No se puede salir de CANCELADO
};

export class PedidoService {
    constructor(pedidoRepository, productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
    }

    async getPrecioUnitario(productoID) {
        return await this.productoRepository.findById(productoID).precio;
    }

    //#############
    //CREATE pedido
    //#############
    async hayStockProducto(id, cantidad) {
        const unProducto = await this.productoRepository.findById(id);

        //TODO: mover el manejo de errores a la capa de controller, de esta forma no tira el 400 al usuario
        if (unProducto === null) {
            throw new Error(`El producto de id ${id} no existe como producto`);
        }

        if (unProducto.stock < cantidad) {
            throw new Error(
                `El producto ${unProducto.getTitulo()} tiene un stock inferior, ${unProducto.getStock()}, a la cantidad solicitada, ${cantidad}`
            );
        }
        return true;
    }

    async hayStockTodosProductos(pedido) {
        // .every() no espera a las promesas hay que utilizar Promise.all
        /*return pedido.getItemsPedido().every(
              (item) =>
              this.hayStockProducto(item.producto, item.cantidad)
        );*/

        const resultados = await Promise.all(
            pedido.getItemsPedido().map(
                (item) => this.hayStockProducto(item.productoID, item.cantidad)
            )
        );
        return resultados.every(r => r);
    }

    async actualizarStock(id_producto, cantidad_comprada) {
        const unProducto = await this.productoRepository.findById(id_producto);
        const nuevoStock = unProducto.stock - cantidad_comprada;
        unProducto.setStock(nuevoStock);
        await this.productoRepository.actualizar(id_producto, unProducto);
    }

    //Foreach no espera a las promesas
    async actualizarStockProductos(pedido) {
        for (const item of pedido.getItemsPedido()) {
            await this.actualizarStock(item.productoID, item.cantidad);
        }
    }

    async crearPedido(pedido) {
        if (!await this.hayStockTodosProductos(pedido)) {
            //TODO:revisar los errores cuando no hay stock
            return;
        }

        await this.actualizarStockProductos(pedido);

        return await this.pedidoRepository.create(pedido);
    }

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
}
