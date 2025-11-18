import { jest } from "@jest/globals";
import { PedidoService } from "../services/pedidoService.js";
import { EstadoPedido } from "../models/entities/pedido/estadoPedido.js";
import { NotFoundError } from "../middleware/appError.js";

// --- Mocks básicos para dependencias ---
const mockPedidoRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    actualizar: jest.fn(),
    historialPedidos: jest.fn(),
    obtenerPedidosSegun: jest.fn(),
};

const mockProductoService = {
    obtenerProducto: jest.fn(),
    actualizarStock: jest.fn(),
};

const mockNotificacionService = {
    crearNotificacion: jest.fn(),
};

// --- Instancia global del service ---
let pedidoService;

beforeEach(() => {
    jest.clearAllMocks();
    pedidoService = new PedidoService(
        mockPedidoRepository,
        mockProductoService,
        mockNotificacionService
    );
});

describe("PedidoService", () => {
    // ==========================================================
    // 🔹 obtenerPedido(id)
    // ==========================================================
    test("Debería obtener un pedido existente por su ID", async () => {
        const pedidoMock = { id: "123", compradorID: "abc" };
        mockPedidoRepository.findById.mockResolvedValue(pedidoMock);

        const result = await pedidoService.obtenerPedido("123");

        expect(mockPedidoRepository.findById).toHaveBeenCalledWith("123");
        expect(result).toBe(pedidoMock);
    });

    test("Debería lanzar NotFoundError si el pedido no existe", async () => {
        mockPedidoRepository.findById.mockResolvedValue(null);

        await expect(pedidoService.obtenerPedido("999")).rejects.toThrow(NotFoundError);
    });

    // ==========================================================
    // 🔹 eliminarPedido(id)
    // ==========================================================
    test("Debería eliminar un pedido existente", async () => {
        const pedidoMock = { id: "1" };
        mockPedidoRepository.delete.mockResolvedValue(pedidoMock);

        const result = await pedidoService.eliminarPedido("1");

        expect(mockPedidoRepository.delete).toHaveBeenCalledWith("1");
        expect(result).toEqual(pedidoMock);
    });

    test("Debería lanzar NotFoundError si no existe el pedido al eliminar", async () => {
        mockPedidoRepository.delete.mockResolvedValue(null);

        await expect(pedidoService.eliminarPedido("404")).rejects.toThrow(NotFoundError);
    });

    // ==========================================================
    // 🔹 getPrecioUnitario(productoID)
    // ==========================================================
    test("Debería retornar el precio unitario de un producto existente", async () => {
        const productoMock = { getPrecio: () => 1500 };
        mockProductoService.obtenerProducto.mockResolvedValue(productoMock);

        const precio = await pedidoService.getPrecioUnitario("abc");

        expect(mockProductoService.obtenerProducto).toHaveBeenCalledWith("abc");
        expect(precio).toBe(1500);
    });

    test("Debería retornar null si el producto no existe", async () => {
        mockProductoService.obtenerProducto.mockResolvedValue(null);

        const precio = await pedidoService.getPrecioUnitario("zzz");

        expect(precio).toBeNull();
    });

    // ==========================================================
    // 🔹 obtenerPedidosSegun(query)
    // ==========================================================
    test("Debería obtener pedidos según filtros", async () => {
        const query = { page: 1, limit: 5, estado: "PENDIENTE" };
        const pedidosMock = [{ id: "p1" }, { id: "p2" }];

        mockPedidoRepository.obtenerPedidosSegun.mockResolvedValue(pedidosMock);

        const result = await pedidoService.obtenerPedidosSegun(query);

        expect(mockPedidoRepository.obtenerPedidosSegun).toHaveBeenCalledWith(query);
        expect(result).toEqual(pedidosMock);
    });

    // ==========================================================
    // 🔹 actualizarEstado(id, nuevoEstado)
    // ==========================================================
    test("Debería actualizar el estado del pedido y notificar al comprador", async () => {
        const pedidoMock = {
            id: "1",
            compradorID: "C123",
            estado: "PENDIENTE",
            cambiarEstado: jest.fn(function (nuevoEstado) {
                this.estado = nuevoEstado;
            }),
            getItemsPedido: jest.fn().mockReturnValue([{ productoID: "P1", cantidad: 2 }]),
        };

        mockPedidoRepository.findById.mockResolvedValue(pedidoMock);
        mockPedidoRepository.actualizar.mockResolvedValue(pedidoMock);
        mockProductoService.obtenerProducto.mockResolvedValue({ vendedor: "V555" });

        const result = await pedidoService.actualizarEstado("1", EstadoPedido.ENVIADO);

        expect(pedidoMock.cambiarEstado).toHaveBeenCalledWith(EstadoPedido.ENVIADO);
        expect(mockNotificacionService.crearNotificacion).toHaveBeenCalled();
        expect(mockPedidoRepository.actualizar).toHaveBeenCalledWith("1", pedidoMock);
        expect(result.estado).toBe(EstadoPedido.ENVIADO);
    });

    // ==========================================================
    // 🔹 crearPedido(pedido)
    // ==========================================================
    // Falta contexto: necesitamos saber cómo es la estructura del pedido,
    // qué devuelve productoService.actualizarStock, y cómo se construye la notificación.

    test("Debería crear un pedido exitosamente y notificar al vendedor", async () => {
        // --- Mock del pedido recibido ---
        const pedidoMock = {
            compradorID: "U123",
            direccionEntrega: {
                calle: "Av. Siempre Viva",
                altura: "742",
                codigoPostal: "1000",
                ciudad: "Buenos Aires",
                provincia: "Buenos Aires",
            },
            getItemsPedido: jest.fn().mockReturnValue([
                { productoID: "P1", cantidad: 3, precioUnitario: 500 },
                { productoID: "P2", cantidad: 2, precioUnitario: 1000 },
            ]),
        };

        // --- Mock del producto obtenido ---
        const producto1 = { id: "P1", vendedor: "V999", stock: 10 };
        const producto2 = { id: "P2", vendedor: "V888", stock: 5 };

        // --- Mock del pedido guardado ---
        const nuevoPedidoMock = {
            id: "PED123",
            compradorID: "U123",
            estado: "PENDIENTE",
            itemsPedido: pedidoMock.getItemsPedido(),
        };

        // --- Mocks de dependencias ---
        mockProductoService.obtenerProducto
            .mockResolvedValueOnce(producto1)
            .mockResolvedValueOnce(producto2);

        mockProductoService.actualizarStock.mockResolvedValue(true);
        mockPedidoRepository.create.mockResolvedValue(nuevoPedidoMock);
        mockNotificacionService.crearNotificacion.mockResolvedValue({
            usuarioDestino: "V999",
            mensaje: "Nuevo pedido recibido",
        });

        // --- Ejecución del flujo ---
        const result = await pedidoService.crearPedido(pedidoMock);

        // --- Expectativas ---
        expect(mockProductoService.obtenerProducto).toHaveBeenCalledTimes(1);
        expect(mockProductoService.actualizarStock).toHaveBeenCalledTimes(2);
        expect(mockPedidoRepository.create).toHaveBeenCalledWith(pedidoMock);
        expect(mockNotificacionService.crearNotificacion).toHaveBeenCalled();

        expect(result).toEqual(nuevoPedidoMock);
    });


    // ==========================================================
    // 🔹 historialPedido(idCliente, page, limit)
    // ==========================================================
    test("Debería obtener el historial de pedidos de un cliente", async () => {
        const pedidosMock = [{ id: "1" }, { id: "2" }];
        mockPedidoRepository.historialPedidos.mockResolvedValue(pedidosMock);

        const result = await pedidoService.historialPedido("CLI123", 1, 10);

        expect(mockPedidoRepository.historialPedidos).toHaveBeenCalledWith("CLI123", 1, 10);
        expect(result).toEqual(pedidosMock);
    });
});