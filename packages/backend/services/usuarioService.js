
export class UsuarioService {
  constructor(usuarioRepo,pedidoRepo) {
    this.usuarioRepo = usuarioRepo;
    this.pedidoRepo = pedidoRepo;
  }

  crearUsuario(usuario){
    return this.usuarioRepo.create(usuario);
  }

  findUserByID(id_user){
    return this.usuarioRepo.findUserByID(id_user);
  }

  historialPedidos(id){
    return this.pedidoRepo.historialPedidos(id);
  }

}