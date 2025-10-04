import {usuarioSchema} from "../middleware/schemas/usuarioSchema.js";

export class UsuarioController {

    constructor(usuarioService) {
        this.usuarioService = usuarioService
    }

    crearUsuario(req, res, next) {

        const nuevoUsuario = usuarioSchema.parsearUsuario(req)
        this.usuarioService.crearUsuario(nuevoUsuario)
        .then(usuarioCreado => {
            return res.status(201).json(usuarioCreado);
        })
        .catch(error => {
            next(error);
        })
    }

    obtenerUsuario(req, res, next) {
        const idResult = usuarioSchema.parsearId(req);
        this.usuarioService.obtenerUsuario(idResult)
        .then(usuario => {
            return res.status(200).json(usuario);
        })
        .catch(error => {
            next(error);
        })
    }

    historialPedidos(req, res, next) {
        const idResult = usuarioSchema.parsearId(req);
        this.usuarioService.historialPedidos(idResult)
        .then(historial => {
            return res.status(200).json(historial);
        })
        .catch(error => {
            next(error);
        })
    }

    // Notificaciones
    
    obtenerNotificaciones(req, res, next) {
        const idResult = usuarioSchema.parsearId(req);
        this.usuarioService.obtenerNotificaciones(idResult)
        .then(notificaciones => {
            return res.status(200).json(notificaciones);
        })
        .catch(error => {
            next(error);
        })
    }
    
    obtenerNotificacionesNoLeidas(req, res, next) {
        const idResult = usuarioSchema.parsearId(req);
        this.usuarioService.obtenerNotificacionesNoLeidas(idResult)
        .then(notificaciones => {
            return res.status(200).json(notificaciones);
        })
        .catch(error => {
            next(error);
        })
    }

    obtenerNotificacionesLeidas(req, res, next) {
        const idResult = usuarioSchema.parsearId(req);
        this.usuarioService.obtenerNotificacionesLeidas(idResult)
        .then(notificaciones => {
            return res.status(200).json(notificaciones);
        })
        .catch(error => {
            next(error);
        })
    }

    marcarComoLeida(req, res, next) {
        const idResult = usuarioSchema.parsearId(req);
        this.usuarioService.marcarComoLeida(idResult)
        .then(notificaciones => {
            return res.status(200).json(notificaciones);
        })
        .catch(error => {
            next(error);
        })
    }

}
