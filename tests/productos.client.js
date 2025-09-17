import axios from 'axios';

export class ProductoClient {
    constructor(baseURL = 'http://localhost:3000') {
        this.api = axios.create({
            baseURL,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async listarProductos() {
        const response = await this.api.get('/productos');
        return response.data;
    }

    async crearProducto(producto) {
        const response = await this.api.post('/productos', producto);
        return response.data;
    }

    async obtenerProducto(id) {
        const response = await this.api.get(`/productos/${id}`);
        return response.data;
    }

    async eliminarProducto(id) {
        const response = await this.api.delete(`/productos/${id}`);
        return response.data;
    }

    async buscarPorCategoria(categoria) {
        const response = await this.api.get(`/productos/categoria/${categoria}`);
        return response.data;
    }
}