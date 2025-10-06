import express from "express";
import { PedidoController } from "../controllers/pedidoController.js";

const pathPedido = "/pedidos";

export default function pedidoRoutes(getController) {
  const router = express.Router();

  router.post(pathPedido, (req, res, next) => {
    getController(PedidoController).crearPedido(req, res, next);
  });

  router.get(pathPedido, (req, res, next) => {
    getController(PedidoController).listarPedidos(req, res, next);
  });

  router.get(pathPedido + "/:id", (req, res, next) => {
    getController(PedidoController).obtenerPedido(req, res, next);
  });

  router.delete(pathPedido + "/:id", (req, res, next) => {
    getController(PedidoController).eliminarPedido(req, res, next);
  });

  router.patch(pathPedido + "/:id", (req, res, next) => {
    getController(PedidoController).actualizarEstado(req, res, next);
  });

  return router;
}
