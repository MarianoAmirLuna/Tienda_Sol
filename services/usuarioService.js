export class UsuarioService {
    constructor(usuarioRepo, pedidoService) {
        this.usuarioRepo = usuarioRepo;
        this.pedidoService = pedidoService;
    }

    async crearUsuario(usuario) {
        return await this.usuarioRepo.create(usuario);
    }

    async findUserByID(id_user) {
        return await this.usuarioRepo.findUserByID(id_user);
    }

    async historialPedidos(id) {
        return await this.pedidoService.historialPedido(id);
    }

}