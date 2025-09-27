import {Pedido} from "../models/entities/pedido/pedido.js";
import {ItemPedido} from "../models/entities/pedido/itemPedido.js";
import {pedidoSchema, estadoSchema } from "../middleware/schemas/pedidoSchema.js";


export class PedidoController {

    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }

    crearPedido(req, res, next) {
    const result = pedidoSchema.parsearPedido(req);

    // mapear y obtener los precios de los productos
    Promise.all(
        result.data.items.map(i =>
        this.pedidoService.getPrecioUnitario(i.producto)
            .then(precioUnitario => new ItemPedido(i.producto, i.cantidad, precioUnitario))
        )
    )
    .then(itemsInstanciados => {
        const nuevoPedido = new Pedido(
        result.data.comprador,
        itemsInstanciados,
        result.data.moneda,
        result.data.direccionEntrega
        );
        
        // crear el pedido
        return this.pedidoService.crearPedido(nuevoPedido)
        .then(() => nuevoPedido); // para poder enviarlo en la respuesta
    })
    .then(nuevoPedido => res.status(201).json(nuevoPedido))
    .catch(error => next(error));
    }


    async listarPedidos(req, res) {
        try {
            const pedidos = await this.pedidoService.listarPedidos(); // devuelve directamente un array o undefined

            if (!pedidos || pedidos.length === 0) {
                return res.status(404).json({error: "No se encontraron pedidos"});
            }

            return res.status(200).json({pedidos});
        } catch (error) {
            // Captura errores inesperados, por ejemplo si la base de datos lanza un error
            return res.status(500).json({error: error.message || "Error interno"});
        }
    }

    async obtenerPedido(req, res) {
        const idResult = pedidoSchema.parsearId(req);
        const pedido = await this.pedidoService.obtenerPedido(idResult);

        if (!pedido) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no encontrado`,
            });
        }

        return res.status(200).json(pedido);
    }

    async actualizarEstado(req, res) {
        const idResult = pedidoSchema.parsearId(req);
        const estadoResult = pedidoSchema.parsearEstado(req);

        const pedidoActualizado = await this.pedidoService.cambiarEstado(idResult, estadoResult.data);
        if (!pedidoActualizado) {
            return res.status(400).json({ error: `No se pudo cambiar el estado del pedido` });
        }
        if (pedidoActualizado == -1) {
            return res.status(404).json({ error: `Pedido con id: ${idRidResult} no encontrado` });
        }

        return res.status(200).json({
            mensaje: `Pedido actualizado al estado ${pedidoActualizado.getEstado()} con éxito`,
            pedido: pedidoActualizado
        });
    }


    async delete(req, res){
        const idResult = pedidoSchema.parsearId(req);
        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const pedidoEliminado = await this.pedidoService.delete(idResult.data);
        if (!pedidoEliminado) {
            return res.status(404).json({ error: `Pedido con ID ${idResult.data} no existe` });
        }

        return res.status(200).json({
            mensaje: `Pedido eliminado con éxito`,
            pedido: pedidoEliminado
        });
    }
}
