import express from "express";
import {PedidoController} from "../controllers/pedidoController.js";

const pathPedido = "/pedidos";

// Este getController recibe la clase del controller y devuelve la instancia
export default function pedidoRoutes(getController) {
    const router = express.Router();

    // Crear pedido
    router.post(pathPedido, (req, res) => {
        getController(PedidoController).crearPedido(req, res);
    });

    // Listar todos los pedidos
    router.get(pathPedido, (req, res) => {
        getController(PedidoController).listarPedidos(req, res);
    });

    // Obtener pedido por ID
    router.get(pathPedido + "/:id", (req, res) => {
        getController(PedidoController).obtenerPedido(req, res);
    });

    // Eliminar pedido por ID
    router.delete(pathPedido + "/:id", (req, res) => {
        getController(PedidoController).eliminarPedido(req, res);
    });

    // Cancelar / Enviar pedido en base al ID
    router.patch(pathPedido + "/:id", (req, res) => {
        getController(PedidoController).actualizarEstado(req, res);
    });

    /*
    // Cancelar pedido en base al ID
    router.post(pathPedido + "/:id/cancelar", (req, res) => {
        getController(PedidoController).cancelarPedido(req, res);
    });

    // Marcar como enviado
    router.post(pathPedido + "/:id/enviar", (req, res) => {
        getController(PedidoController).marcarEnviado(req, res);
    });*/

    return router;
}