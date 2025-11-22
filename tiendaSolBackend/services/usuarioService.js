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

  async buscarPorEmail(email) {
    return await this.usuarioRepo.findByMail(email);
  }

  async historialPedidos(id, page, limit) {
    return await this.pedidoService.historialPedido(id, page, limit);
  }

  // Notificaciones

  async obtenerNotificaciones(id, leidas, page, limit) {
    return await this.notificacionService.obtenerNotificaciones(
      id,
      leidas,
      page,
      limit
    );
  }

  async obtenerNotificacionesNoLeidas(id) {
    return await this.notificacionService.obtenerNotificacionesNoLeidas(id);
  }

  async obtenerNotificacionesLeidas(id) {
    return await this.notificacionService.obtenerNotificacionesLeidas(id);
  }

  async marcarLectura(idUsuario, idNotificacion, camposActualizados) {
    return await this.notificacionService.marcarLectura(
      idUsuario,
      idNotificacion,
      camposActualizados
    );
  }
}
