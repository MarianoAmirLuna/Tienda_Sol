import { NotificacionModel } from "../schemasDB/notificacionSchema.js";
import { NotFoundError } from "../middleware/appError.js";

export class NotificacionRepository {
  constructor() {
    this.notificacionSchema = NotificacionModel;
  }

  async create(notificacion) {
    const nuevaNotificacion = new this.notificacionSchema(notificacion);
    return await nuevaNotificacion.save();
  }

  async obtenerNotificacionesDeUsuario(idUsuario, leidas, page, limit) {
    const skip = (page - 1) * limit;
    const filtro = {};
    filtro.usuarioDestino = idUsuario;

    if (leidas !== null) {
      filtro.leida = leidas;
    }

    return await this.notificacionSchema.find(filtro).limit(limit).skip(skip);
  }

  async findById(id) {
    const notificacion = await this.notificacionSchema.findById(id);

    if (!notificacion) throw new NotFoundError(`${id}`);
    return notificacion;
  }

  obtenerObjetoConFechaActual(campos){ 
    return {
        ...campos,
        fechaLeida: new Date()
    };
  }

  async update(idDelUsuario, idNotificacion, camposActualizados) {
    const camposMasFecha = this.obtenerObjetoConFechaActual(camposActualizados);

    const notificacion = await this.notificacionSchema.findByIdAndUpdate(
      idNotificacion,
      { $set: camposMasFecha },
      { new: true, runValidators: true } // devuelve el nuevo documento validado
    );

    if (!notificacion) throw new NotFoundError(`${id}`);
    if (notificacion.usuarioDestino != idDelUsuario)
        throw new UserNotFoundError(idNotificacion, idDelUsuario);

    return notificacion;
  }

  obtenerIndicePorID(id) {
    return this.notificaciones.findIndex(
      (notificacion) => notificacion.id == id
    );
  }
}
