import { UsuarioClient } from './usuario.client.js';

// Mock manual de axios instance
const mockAxiosInstance = {
    post: async (url, data) => {
        if (url === '/usuarios') {
            return { data: { id: 1, ...data } };
        }
    },
    get: async (url) => {
        if (url === '/usuarios/historialPedidos/1') {
            return { data: [
                    {
                        id: 101,
                        comprador: 'Juan Perez',
                        items: [{ producto: 'Laptop', cantidad: 1, precioUnitario: 1000 }],
                        total: 1000,
                        moneda: 'USD',
                        direccionEntrega: 'Calle Falsa 123',
                        estado: 'ENVIADO',
                        fechaCreacion: new Date()
                    },
                    {
                        id: 102,
                        comprador: 'Juan Perez',
                        items: [{ producto: 'Mouse', cantidad: 2, precioUnitario: 50 }],
                        total: 100,
                        moneda: 'USD',
                        direccionEntrega: 'Calle Falsa 123',
                        estado: 'PENDIENTE',
                        fechaCreacion: new Date()
                    }
                ] };
        }
        return { data: [] };
    }
};

// Tests
describe('UsuarioClient', () => {
    let usuarioClient;

    beforeEach(() => {
        usuarioClient = new UsuarioClient();
        usuarioClient.api = mockAxiosInstance; // inyectamos el mock
    });

    it('debería crear un usuario', async () => {
        const nuevoUsuario = { nombre: 'Juan Perez', email: 'juan@test.com' };
        const resultado = await usuarioClient.crearUsuario(nuevoUsuario);

        expect(resultado.id).toBe(1);
        expect(resultado.nombre).toBe('Juan Perez');
        expect(resultado.email).toBe('juan@test.com');
    });

    it('debería obtener el historial de pedidos de un usuario', async () => {
        const historial = await usuarioClient.historialPedidos(1);

        expect(historial.length).toBe(2);
        expect(historial[0].id).toBe(101);
        expect(historial[1].estado).toBe('PENDIENTE');
    });
});