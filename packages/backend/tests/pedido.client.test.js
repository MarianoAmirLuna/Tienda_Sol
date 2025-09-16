import { PedidoClient } from './pedido.client.js';

// Mock de Axios con distintos endpoints simulados
const mockAxiosInstance = {
    post: async (url, data) => {
        if (url === '/pedidos') {
            // validación de stock
            const hayStock = data.items.every(i => i.cantidad <= 5); // supongamos máx 5 unidades disponibles
            if (!hayStock) {
                throw new Error('Stock insuficiente');
            }
            return {
                data: {
                    id: 1,
                    ...data,
                    estado: 'PENDIENTE',
                    fechaCreacion: new Date()
                }
            };
        }
        if (url.startsWith('/pedidos/cancelar/')) {
            return {
                data: { id: 1, estado: 'CANCELADO' }
            };
        }
        if (url.startsWith('/pedidos/enviar/')) {
            return {
                data: { id: 1, estado: 'ENVIADO' }
            };
        }
    },
    get: async (url) => {
        if (url === '/pedidos/1') {
            return {
                data: {
                    id: 1,
                    compradorID: 1,
                    items: [{ producto: 1, cantidad: 1, precioUnitario: 1000 }],
                    total: 1000,
                    moneda: 'USD',
                    direccionEntrega: 'Calle Falsa 123',
                    estado: 'PENDIENTE',
                    fechaCreacion: new Date()
                }
            };
        }
        if (url === '/pedidos/historial/1') {
            return {
                data: [
                    { id: 1, estado: 'PENDIENTE', total: 1000 },
                    { id: 2, estado: 'CANCELADO', total: 500 }
                ]
            };
        }
        return { data: [] };
    }
};

describe('PedidoClient', () => {
    let pedidoClient;

    beforeEach(() => {
        pedidoClient = new PedidoClient();
        pedidoClient.api = mockAxiosInstance; // inyectamos mock
    });

    it('✅ debería crear un pedido válido cuando hay stock suficiente', async () => {
        const nuevoPedido = {
            comprador: 1,
            items: [{ producto: 1, cantidad: 2, precioUnitario: 1000 }],
            total: 2000,
            moneda: 'USD',
            direccionEntrega: 'Calle Falsa 123'
        };

        const resultado = await pedidoClient.crearPedido(nuevoPedido);
        expect(resultado.id).toBe(1);
        expect(resultado.estado).toBe('PENDIENTE');
    });

    it('❌ debería fallar la creación si no hay stock suficiente', async () => {
        const pedidoSinStock = {
            comprador: 1,
            items: [{ producto: 1, cantidad: 10, precioUnitario: 1000 }],
            total: 10000,
            moneda: 'USD',
            direccionEntrega: 'Calle Falsa 123'
        };

        await expect(pedidoClient.crearPedido(pedidoSinStock))
            .rejects
            .toThrow('Stock insuficiente');
    });

    it('🔍 debería consultar un pedido existente por ID', async () => {
        const pedido = await pedidoClient.api.get('/pedidos/1');
        expect(pedido.data.id).toBe(1);
        expect(pedido.data.compradorID).toBe(1);
    });

    it('🚫 debería cancelar un pedido pendiente', async () => {
        const cancelado = await pedidoClient.api.post('/pedidos/cancelar/1');
        expect(cancelado.data.estado).toBe('CANCELADO');
    });

    it('📜 debería consultar el historial de pedidos de un usuario', async () => {
        const historial = await pedidoClient.api.get('/pedidos/historial/1');
        expect(historial.data.length).toBe(2);
        expect(historial.data[0].estado).toBe('PENDIENTE');
    });

    it('📦 debería marcar un pedido como enviado por el vendedor', async () => {
        const enviado = await pedidoClient.api.post('/pedidos/enviar/1');
        expect(enviado.data.estado).toBe('ENVIADO');
    });
});
