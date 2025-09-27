import { NotFoundError } from "../middleware/appError.js";
import {EstadoPedido} from "../models/entities/pedido/estadoPedido.js";

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

    // ======================================

    async crearPedido(pedido) {

        await this.actualizarStockProductos(pedido);
        return await this.pedidoRepository.create(pedido);
    }


    async listarPedidos() {
        const pedidos = await this.pedidoRepository.findAll();
        return pedidos || [];
    }


    async obtenerPedido(idPedido) {
        const pedido = await this.pedidoRepository.findById(idPedido);
        if (!pedido) {throw new NotFoundError(`${idPedido}`);}
        return pedido;
    }

    async eliminarPedido(id){
        const pedido = await this.pedidoRepository.delete(id);
        if (!pedido) {throw new NotFoundError(`${id}`);}
        return pedido;
    }


    async actualizarEstado(id, nuevoEstado){

        const pedido = await this.obtenerPedido(id);

        if(!pedido) throw new NotFoundError(`${id}`);

        pedido.cambiarEstado(nuevoEstado); // para validar que el estado es correcto

        await this.pedidoRepository.actualizar(id, pedido);
        return pedido;
    }


    //TODO falta este
    async historialPedido(idCliente) {
        return await this.pedidoRepository.historialPedidos(idCliente);
    }
}
