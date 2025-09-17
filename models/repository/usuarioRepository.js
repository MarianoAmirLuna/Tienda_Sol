import { Usuario } from "../entities/usuario/usuario.js";

export class UsuarioRepository {
  constructor() {
    this.usuarios = [];
    this.id = 1;
  }

  create(usuario) {
    usuario.setId(this.id);
    this.id++;
    this.usuarios.push(usuario);
    return usuario;
  }

  findUserByID(id_user){
    const usuario = this.usuarios.find(
      (unUsuario) => unUsuario.getId() == id_user
    );
    return producto ?? null;
  }

}