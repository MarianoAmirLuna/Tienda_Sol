import express from "express";
import { UsuarioController } from "../controllers/usuarioController.js";

const pathUsuario = "/usuarios";

// Este getController recibe la clase del controller y devuelve la instancia
export default function usuarioRoutes(getController) {
  const router = express.Router();

  // Crear usuario
  router.post(pathUsuario, (req, res) => {
    getController(UsuarioController).crearUsuario(req, res);
  });

  //Consulta del historial de pedidos de un usuario
  router.get(pathUsuario + "/historialPedidos/:id", (req, res) => {
    getController(UsuarioController).historialPedidos(req, res);
  });

  return router;
}