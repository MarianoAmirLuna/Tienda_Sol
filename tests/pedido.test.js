import { PedidoService} from "../services/pedidoService.js";
import { PedidoController } from "../controllers/pedidoController.js";
import { jest } from '@jest/globals';

// Request de Producto
const reqProducto = {
        titulo: "Camiseta Deportiva",
        descripcion: "Camiseta de algodón de alta calidad para entrenamiento",
        precio: 1200,
        moneda: "ARS",
        stock: 50,
        fotos: [
            "https://example.com/foto1.jpg",
            "https://example.com/foto2.jpg"
        ],
        activo: true,
        categorias: [
            { nombre: "Ropa Deportiva" },
            { nombre: "Camisetas" }
        ],
        vendedor: 1
};

const reqPedido = {
    body: {
        "comprador": 1,
        "items": [
            {
                "producto": 1,
                "cantidad": 2
            }
        ],
        "moneda": "PESO_ARG",
        "direccionEntrega": {
            "calle": "Av. Siempre Viva",
            "altura": "742",
            "piso": "",
            "departamento": "B",
            "codigoPostal": "1414",
            "ciudad": "Buenos Aires",
            "provincia": "Buenos Aires",
            "pais": "Argentina",
            "lat": "-34.6037",
            "lon": "-58.3816"
        }
    }
};

// Response esperado de producto
const producto =
    {
        "id": 1,
        "vendedorID": 1,
        "titulo": "Zapatillas deportivas",
        "descripcion": "Zapatillas de running, talle 42, color azul",
        "categorias": [
            {
                "nombre": "deporte"
            },
            {
                "nombre": "calzado"
            }
        ],
        "precio": 35000,
        "moneda": "PESO_ARG",
        "stock": 20,
        "fotos": [
            "https://example.com/img/zapatillas1.jpg",
            "https://example.com/img/zapatillas2.jpg"
        ],
        "activo": true

    };

// Response esperado de pedido


const pedido =
    {
        id: 1,
        comprador: 1,
        items: [
            { producto: 1, cantidad: 2, precioUnitario: 35000 }
        ],
        total: 70000,
        moneda: "PESO_ARG",
        direccionEntrega: {
            calle: "Av. Siempre Viva",
            altura: "742",
            piso: "",
            departamento: "B",
            codigoPostal: "1414",
            ciudad: "Buenos Aires",
            provincia: "Buenos Aires",
            pais: "Argentina",
            lat: "-34.6037"
        },
        estado: 0,
        fechaCreacion: new Date(),
        historialEstados: []
    }

const repoProducto = {
    findById: jest.fn().mockReturnValue(producto),
    getPrecio: jest.fn().mockReturnValue(35000), 
    hayStockProducto: jest.fn().mockReturnValue(),
    actualizarStock: jest.fn().mockReturnValue(),
    create: jest.fn().mockReturnValue(pedido)

};
const repoPedido = {
    crearPedido: jest.fn().mockResolvedValue(pedido),
    getPedidos: jest.fn().mockResolvedValue([pedido])

};

const pedidoService= new PedidoService(repoPedido, repoProducto);
const pedidoController = new PedidoController(pedidoService);

let res;

beforeEach(() => {
    res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
});

test('Crea un pedido exitosamente', async () => {

    await pedidoController.crearPedido(reqPedido, res);
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            id: 1,
            comprador: 1,
            total: 70000,
            moneda: "PESO_ARG",
            direccionEntrega: expect.objectContaining({
                calle: "Av. Siempre Viva",
                ciudad: "Buenos Aires"
            }),
            items: expect.arrayContaining([
                expect.objectContaining({
                    producto: 1,
                    cantidad: 2,
                    precioUnitario: 35000
                })
            ]),
            estado: 0,
            fechaCreacion: expect.any(Date), // o expect.any(String), según tu modelo
            historialEstados: []
        })
    );
    expect(res.status).toHaveBeenCalledWith(201);
});

test('test test', () => {
    expect(true).toBe(true);
})