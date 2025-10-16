import { usuarioSchema } from "../middleware/schemas/usuarioSchema.js";

export class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  async crearUsuario(req, res, next) {
    const nuevoUsuario = usuarioSchema.parsearUsuario(req);
    await this.usuarioService
      .crearUsuario(nuevoUsuario)
      .then((usuarioCreado) => {
        return res.status(201).json(usuarioCreado);
      })
      .catch((error) => {
        next(error);
      });
  }

  async obtenerUsuario(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    await this.usuarioService
      .obtenerUsuario(idResult)
      .then((usuario) => {
        return res.status(200).json(usuario);
      })
      .catch((error) => {
        next(error);
      });
  }

  async historialPedidos(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    const { page = 1, limit = 10 } = req.query;

    await this.usuarioService
      .historialPedidos(idResult, page, limit)
      .then((historial) => {
        return res.status(200).json(historial);
      })
      .catch((error) => {
        next(error);
      });
  }

  // Notificaciones

  async obtenerNotificaciones(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    const { page = 1, limit = 10, leidas = null } = req.query;

    await this.usuarioService
      .obtenerNotificaciones(idResult, leidas, page, limit)
      .then((notificaciones) => {
        return res.status(200).json(notificaciones);
      })
      .catch((error) => {
        next(error);
      });
  }

  obtenerNotificacionesNoLeidas(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    this.usuarioService
      .obtenerNotificacionesNoLeidas(idResult)
      .then((notificaciones) => {
        return res.status(200).json(notificaciones);
      })
      .catch((error) => {
        next(error);
      });
  }

  obtenerNotificacionesLeidas(req, res, next) {
    const idResult = usuarioSchema.parsearId(req);
    this.usuarioService
      .obtenerNotificacionesLeidas(idResult)
      .then((notificaciones) => {
        return res.status(200).json(notificaciones);
      })
      .catch((error) => {
        next(error);
      });
  }

  async marcarLectura(req, res, next) {
    const idUsuarioResult = usuarioSchema.parsearIdString(req.params.id);
    const idNotificacionResult = usuarioSchema.parsearIdString(req.params.idNotificacion);

    const camposActualizados = req.body

    return await this.usuarioService
      .marcarLectura(idUsuarioResult, idNotificacionResult, camposActualizados)
      .then((nuevaNotificaciones) => {
        return res.status(200).json(nuevaNotificaciones);
      })
      .catch((error) => {
        next(error);
      });
  }
}
