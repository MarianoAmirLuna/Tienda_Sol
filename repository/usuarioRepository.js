import { Usuario } from "../models/entities/usuario/usuario.js";
import { UsuarioModel } from "../schemasDB/usuarioSchema.js";

export class UsuarioRepository {
  constructor() {
    this.model = UsuarioModel;
  }

  async create(usuarioData) {
    const usuario = new this.model(usuarioData);
    return await usuario.save();
  }

  async findUserByID(id) {
    return await this.model.findById(id);
  }

  /*constructor() {
    this.usuarios = [];
    this.id = 1;
  }

  create(usuario) {
    usuario.setId(this.id);
    this.id++;
    this.usuarios.push(usuario);
    return  Promise.resolve(usuario);
  }

  //TODO mantener consistencia
  findUserByID(id_user) {
    const usuario = this.usuarios.find((u) => u.getId() === parseInt(id_user));
    return Promise.resolve(usuario);
  }*/
}
