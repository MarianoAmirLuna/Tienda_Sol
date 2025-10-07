import { NotificacionModel } from "../schemasDB/notificacionSchema.js";

export class NotificacionRepository {
  constructor() {
    this.notificacionSchema = NotificacionModel;
  }

  async create(notificacion) {
    const nuevaNotificacion = new this.notificacionSchema(notificacion);
    return await nuevaNotificacion.save();
  }

  /*
  async create(notificacion) {
    const notificacionData = {
    usuarioDestino: notificacion.usuarioDestino,
    mensaje: notificacion.mensaje
    };
    const nuevaNotificacion = new this.notificacionSchema(notificacionData);
    return await nuevaNotificacion.save();
  }
  */
  obtenerNotificacionesDeUsuario(idUsuario) {
    const notificacionesUsuario = this.notificaciones.filter(
      (n) => n.usuarioDestino == idUsuario
    );
    return Promise.resolve(notificacionesUsuario);
  }

  async findById(id) {
    const notificacion = await this.notificacionSchema.findById(id);

    if (!notificacion) throw new NotFoundError(`${id}`);
    return notificacion;
  }

  update(id, notificacionActualizada) {
    if (notificacionActualizada == null) return Promise.resolve(null);

    const indice = this.obtenerIndicePorID(id);

    if (indice === -1) return Promise.resolve(null);

    this.notificaciones[indice] = notificacionActualizada;

    return Promise.resolve(notificacionActualizada);
  }

  obtenerIndicePorID(id) {
    return this.notificaciones.findIndex(
      (notificacion) => notificacion.id == id
    );
  }
}
