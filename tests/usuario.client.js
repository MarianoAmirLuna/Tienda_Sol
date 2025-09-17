import axios from 'axios';

export class UsuarioClient {
    constructor(baseURL = 'http://localhost:3000') {
        this.api = axios.create({
            baseURL,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async crearUsuario(usuario) {
        const response = await this.api.post('/usuarios', usuario);
        return response.data;
    }

    async historialPedidos(idUsuario) {
        const response = await this.api.get(`/usuarios/historialPedidos/${idUsuario}`);
        return response.data;
    }
}