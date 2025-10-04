export class NotificacionService {
    constructor(notificacionRepo) {
        this.notificacionRepo = notificacionRepo;
    }

    async crearNotificacion(notificacion) {
        return await this.notificacionRepo.create(notificacion);
    }

    async obtenerNotificaciones(idUsuario) {
        const notificaciones = await this.notificacionRepo.obtenerNotificacionesDeUsuario(idUsuario);
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

    async marcarComoLeida(idNotificacion) {
        const notificacion = await this.notificacionRepo.findById(idNotificacion);
        if (!notificacion) throw new NotFoundError(`${idNotificacion}`);
        notificacion.marcarComoLeida();
        return await this.notificacionRepo.update(idNotificacion, notificacion);
    }
}