import axios from 'axios';

export class PedidoClient {
    constructor(baseURL = 'http://localhost:3000') {
        this.api = axios.create({
            baseURL,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async crearPedido(pedido) {
        const response = await this.api.post('/pedidos', pedido);
        return response.data;
    }

    async listarPedidos() {
        const response = await this.api.get('/pedidos');
        return response.data;
    }

    async obtenerPedido(id) {
        const response = await this.api.get(`/pedidos/${id}`);
        return response.data;
    }

    async cancelarPedido(id) {
        const response = await this.api.post(`/pedidos/${id}/cancelar`);
        return response.data;
    }

    async historialPedidos(usuarioId) {
        const response = await this.api.get(`/usuarios/${usuarioId}/pedidos`);
        return response.data;
    }

    async marcarEnviado(id) {
        const response = await this.api.post(`/pedidos/${id}/enviar`);
        return response.data;
    }
}