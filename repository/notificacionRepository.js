export class NotificacionRepository {
    constructor() {
        this.notificaciones = [];
        this.id = 1;
    }

    create(notificacion) {
        notificacion.setId(this.id);
        this.id++;
        this.notificaciones.push(notificacion);
        return Promise.resolve(notificacion);
    }

    obtenerNotificacionesDeUsuario(idUsuario) {
        const notificacionesUsuario = this.notificaciones.filter(n => n.usuarioDestino == idUsuario);
        return Promise.resolve(notificacionesUsuario);
    }

    findById(id) {
        const notificacion = this.notificaciones.find(
            (unaNotificacion) => unaNotificacion.id == id
        );
        return Promise.resolve(notificacion ?? null);
    }

    update(id, notificacionActualizada) {

        if(notificacionActualizada == null) return Promise.resolve(null);

        const indice = this.obtenerIndicePorID(id);

        if (indice === -1) return Promise.resolve(null);

        this.notificaciones[indice] = notificacionActualizada;

        return Promise.resolve(notificacionActualizada);
    }

    obtenerIndicePorID(id){
        return this.notificaciones.findIndex((notificacion) => notificacion.id == id);
    }
}