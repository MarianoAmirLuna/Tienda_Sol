import express from "express";
import {PedidoController} from "../controllers/pedidoController.js";

const pathPedido = "/pedidos";

// Este getController recibe la clase del controller y devuelve la instancia
export default function pedidoRoutes(getController) {
    const router = express.Router();

    // Crear pedido
    router.post(pathPedido, (req, res, next) => {
        getController(PedidoController).crearPedido(req, res, next);
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


    return router;
}