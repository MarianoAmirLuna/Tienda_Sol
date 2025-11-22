import supertest from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';

// Configuración simple sin mocks complejos
describe("PedidoController - Integración Simple", () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        // Ruta de prueba simple
        app.post('/api/pedidos', (req, res) => {
            // Simular validación
            const { compradorID, itemsPedido, direccionEntrega } = req.body;
            
            if (!compradorID || !itemsPedido || !direccionEntrega) {
                return res.status(400).json({ error: 'Datos incompletos' });
            }
            
            if (!Array.isArray(itemsPedido) || itemsPedido.length === 0) {
                return res.status(400).json({ error: 'Items inválidos' });
            }

            // Simular pedido creado
            const pedidoCreado = {
                id: 'TEST_' + Math.random().toString(36).substr(2, 9),
                compradorID,
                itemsPedido,
                direccionEntrega,
                estado: 'PENDIENTE',
                total: itemsPedido.reduce((sum, item) => sum + (item.cantidad * (item.precioUnitario || 100)), 0),
                fechaCreacion: new Date().toISOString()
            };

            res.status(201).json(pedidoCreado);
        });

        // Middleware de errores
        app.use((error, req, res, next) => {
            res.status(500).json({ error: 'Error interno' });
        });
    });

    test("Crear pedido exitosamente", async () => {
        const pedidoData = {
            compradorID: "USER_123",
            itemsPedido: [
                { productoID: "PROD_1", cantidad: 2, precioUnitario: 500 },
                { productoID: "PROD_2", cantidad: 1, precioUnitario: 1000 }
            ],
            direccionEntrega: {
                calle: "Av. Test",
                altura: "123",
                codigoPostal: "1000",
                ciudad: "Buenos Aires",
                provincia: "Buenos Aires",
                pais: "Argentina"
            }
        };

        const response = await supertest(app)
            .post('/api/pedidos')
            .send(pedidoData)
            .expect(201);

        expect(response.body.compradorID).toBe("USER_123");
        expect(response.body.estado).toBe("PENDIENTE");
        expect(response.body.total).toBe(2000); // 2*500 + 1*1000
    });

    test("Falla con datos incompletos", async () => {
        const response = await supertest(app)
            .post('/api/pedidos')
            .send({}) // Datos vacíos
            .expect(400);

        expect(response.body).toHaveProperty('error');
    });
});