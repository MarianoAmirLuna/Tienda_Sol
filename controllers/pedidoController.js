import {Pedido} from "../models/entities/pedido/pedido.js";
import {ItemPedido} from "../models/entities/pedido/itemPedido.js";
import {pedidoSchema } from "../middleware/schemas/pedidoSchema.js";
import { id } from "zod/locales";


export class PedidoController {

    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }


    crearPedido(req, res, next) {
        const result = pedidoSchema.parsearPedido(req);

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
            
            return this.pedidoService.crearPedido(nuevoPedido)
            .then(() => nuevoPedido);
        })
        .then(nuevoPedido => res.status(201).json(nuevoPedido))
        .catch(error => next(error));
    }


    listarPedidos(req, res, next) {

        this.pedidoService.listarPedidos()
            .then(pedidos => {
                return res.status(200).json({ pedidos });
            })
            .catch(error => next(error));   

    }


    obtenerPedido(req, res, next) {

        const idResult = pedidoSchema.parsearId(req);

        this.pedidoService.obtenerPedido(idResult)
            .then(pedido => res.status(200).json(pedido))
            .catch(error => next(error));
    }


    eliminarPedido(req, res, next){

        const idResult = pedidoSchema.parsearId(req);

        this.pedidoService.eliminarPedido(idResult)
            .then(pedidoEliminado => {
                res.status(200).json({
                    mensaje: `Pedido ${idResult} eliminado con éxito`,
                    //pedido: pedidoEliminado
                });
            })
            .catch(error => next(error));
    }


    actualizarEstado(req, res, next) {

        const idResult = pedidoSchema.parsearId(req);
        const nuevoEstado = pedidoSchema.parsearEstado(req);

        this.pedidoService.actualizarEstado(idResult, nuevoEstado)
            .then(pedidoActualizado => {
                res.status(200).json({
                    mensaje: `Pedido actualizado al estado ${pedidoActualizado.getEstado()} con éxito`,
                    pedido: pedidoActualizado
                });
            })
            .catch(error => next(error));
    }

}
