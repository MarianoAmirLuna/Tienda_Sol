import { ProductoClient } from './productos.client.js';

// Mock manual de axios instance
const mockAxiosInstance = {
    get: async (url) => {
        if (url === '/productos') {
            return { data: [
                    { id: 1, nombre: 'Laptop', categoria: 'Electrónica', stock: 10, precio: 1000 },
                    { id: 2, nombre: 'Mouse', categoria: 'Electrónica', stock: 50, precio: 50 }
                ] };
        }
        if (url === '/productos/1') {
            return { data: { id: 1, nombre: 'Laptop', categoria: 'Electrónica', stock: 10, precio: 1000 } };
        }
        if (url === '/productos/categoria/Electrónica') {
            return { data: [
                    { id: 1, nombre: 'Laptop', categoria: 'Electrónica', stock: 10, precio: 1000 },
                    { id: 2, nombre: 'Mouse', categoria: 'Electrónica', stock: 50, precio: 50 }
                ] };
        }
        return { data: [] };
    },
    post: async (url, data) => {
        if (url === '/productos') {
            return { data: { id: 3, ...data } };
        }
    },
    delete: async (url) => {
        if (url === '/productos/1') {
            return { data: { success: true } };
        }
    }
};

// Tests
describe('ProductoClient', () => {
    let productoClient;

    beforeEach(() => {
        productoClient = new ProductoClient();
        productoClient.api = mockAxiosInstance; // inyectamos el mock
    });

    it('debería listar productos', async () => {
        const productos = await productoClient.listarProductos();
        expect(productos.length).toBe(2);
        expect(productos[0].nombre).toBe('Laptop');
    });

    it('debería crear un producto', async () => {
        const nuevoProducto = { nombre: 'Teclado', categoria: 'Electrónica', stock: 30, precio: 80 };
        const resultado = await productoClient.crearProducto(nuevoProducto);
        expect(resultado.id).toBe(3);
        expect(resultado.nombre).toBe('Teclado');
    });

    it('debería obtener un producto por id', async () => {
        const producto = await productoClient.obtenerProducto(1);
        expect(producto.id).toBe(1);
        expect(producto.nombre).toBe('Laptop');
    });

    it('debería eliminar un producto', async () => {
        const resultado = await productoClient.eliminarProducto(1);
        expect(resultado.success).toBe(true);
    });

    it('debería buscar productos por categoría', async () => {
        const productos = await productoClient.buscarPorCategoria('Electrónica');
        expect(productos.length).toBe(2);
        expect(productos[1].nombre).toBe('Mouse');
    });
});