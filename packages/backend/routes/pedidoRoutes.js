import express from "express";
import { PedidoController } from "../controllers/pedidoController.js";

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

  // Cancelar pedido en base al ID
  router.post(pathPedido + "/cancelar/:id", (req, res) => {
    getController(PedidoController).cancelarPedido(req, res); //TODO:esta bien que sea post? o podemos usar otro metodo http?
  });

  // Marcar como enviado
  router.post(pathPedido + "/marcarEnviado/:id", (req, res) => {
    getController(PedidoController).marcarEnviado(req, res);
  });

  return router;
}