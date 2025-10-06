import { Usuario } from "../models/entities/usuario/usuario.js";

export class UsuarioService {
  constructor(usuarioRepo, pedidoService, notificacionService) {
    this.usuarioRepo = usuarioRepo;
    this.pedidoService = pedidoService;
    this.notificacionService = notificacionService;
  }

  async crearUsuario(usuarioData) {
    return await this.usuarioRepo.create(usuarioData);
  }

  async obtenerUsuario(id) {

    const user = await this.usuarioRepo.findById(id);
    return user;
  }

  async historialPedidos(id) {
    return await this.pedidoService.historialPedido(id);
  }

  // Notificaciones

  async obtenerNotificaciones(id) {
    return await this.notificacionService.obtenerNotificaciones(id);
  }

  async obtenerNotificacionesNoLeidas(id) {
    return await this.notificacionService.obtenerNotificacionesNoLeidas(id);
  }

  async obtenerNotificacionesLeidas(id) {
    return await this.notificacionService.obtenerNotificacionesLeidas(id);
  }

  async marcarComoLeida(idNotificacion) {
    return await this.notificacionService.marcarComoLeida(idNotificacion);
  }
}
