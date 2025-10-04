import express from "express";
import { UsuarioController } from "../controllers/usuarioController.js";

const pathUsuario = "/usuarios";

// Este getController recibe la clase del controller y devuelve la instancia
export default function usuarioRoutes(getController) {
  const router = express.Router();

  // Crear usuario
  router.post(pathUsuario, (req, res, next) => {
    getController(UsuarioController).crearUsuario(req, res, next);
  });

  router.get(pathUsuario + "/:id", (req, res, next) => {
    getController(UsuarioController).obtenerUsuario(req, res, next);
  });

  //Consulta del historial de pedidos de un usuario
  router.get(pathUsuario + "/historialPedidos/:id", (req, res, next) => {
    getController(UsuarioController).historialPedidos(req, res, next);
  });
  
  // Notificaciones
  
  router.get(pathUsuario + "/notificaciones/:id", (req, res, next) => {
    getController(UsuarioController).obtenerNotificaciones(req, res, next);
  });

  router.get(pathUsuario + "/notificaciones/noLeidas/:id", (req, res, next) => {
    getController(UsuarioController).obtenerNotificacionesNoLeidas(req, res, next);
  });

  router.get(pathUsuario + "/notificaciones/leidas/:id", (req, res, next) => {
    getController(UsuarioController).obtenerNotificacionesLeidas(req, res, next);
  });

  router.post(pathUsuario + "/notificaciones/marcarLeida/:id", (req, res, next) => {
    getController(UsuarioController).marcarComoLeida(req, res, next);
  });

  return router;
}