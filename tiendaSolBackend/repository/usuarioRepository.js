import { UsuarioModel } from '../schemasDB/usuarioSchema.js';

export class UsuarioRepository {

    constructor() {
        this.usuarioSchema = UsuarioModel;
    }

    async create(usuarioData) {
        const usuario = new this.usuarioSchema(usuarioData);
        return await usuario.save();
    }

    async findById(id) {
        const usuario = await this.usuarioSchema.findById(id);

        if (!usuario) {
        throw new NotFoundError(`${id}`);
        }

        return usuario;
    }

    // async findAll() {
    //     return await this.usuarioSchema.find();
    // }

    // async update(id, usuarioData) {
    //     return await this.usuarioSchema.findByIdAndUpdate(id, usuarioData, { new: true });
    // }

    // async delete(id) {
    //     return await this.usuarioSchema.findByIdAndDelete(id);
    // }
}
