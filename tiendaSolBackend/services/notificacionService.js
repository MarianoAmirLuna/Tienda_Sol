import { UserNotFoundError } from "../middleware/appError.js";


export class NotificacionService {
    constructor(notificacionRepo) {
        this.notificacionRepo = notificacionRepo;
    }

    async crearNotificacion(notificacion) {
        return await this.notificacionRepo.create(notificacion);
    }

    async obtenerNotificaciones(idUsuario, leidas, page, limit) {
        const notificaciones = await this.notificacionRepo.obtenerNotificacionesDeUsuario(idUsuario, leidas, page, limit);
        return notificaciones || [];
    }   

    async obtenerNotificacionesNoLeidas(idUsuario) {
        const notificaciones = await this.obtenerNotificaciones(idUsuario);
        return notificaciones.filter(n => !n.leida);
    }

    async obtenerNotificacionesLeidas(idUsuario) {
        const notificaciones = await this.obtenerNotificaciones(idUsuario);
        return notificaciones.filter(n => n.leida);
    }

    async marcarLectura(idDelUsuario, idNotificacion, camposActualizados) {
        return await this.notificacionRepo.update(idDelUsuario, idNotificacion, camposActualizados);
    }
}