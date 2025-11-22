import { ProductoService } from "../services/productoService.js";
import { jest } from '@jest/globals';
import { NotFoundError } from "../middleware/appError.js";

const productoMock = {
    _id: "6720c8a4c4a32d001f21ab45",
    nombre: "Zapatillas deportivas",
    descripcion: "Zapatillas de running, talle 42, color azul",
    precio: 35000,
    stock: 30,
    fotos: [
        "https://example.com/img/zapatillas1.jpg",
        "https://example.com/img/zapatillas2.jpg"
    ],
    activo: true,
    categorias: ["ZAPATOS"],
    vendedor: "672048b2e41f2a3c4bfa2e8a",
};

describe("ProductoService", () => {
    let productoRepository;
    let productoService;

    beforeEach(() => {
        productoRepository = {
            findById: jest.fn(),
            obtenerProductosSegun: jest.fn(),
        };

        productoService = new ProductoService(productoRepository);
    });

    test("Obtener un producto existente por su ID", async () => {
        // Mock del repositorio
        productoRepository.findById.mockResolvedValue(productoMock);

        // Ejecutar el método del service
        const result = await productoService.obtenerProducto("6720c8a4c4a32d001f21ab45");

        // Verificaciones
        expect(productoRepository.findById).toHaveBeenCalledWith("6720c8a4c4a32d001f21ab45");
        expect(result).toEqual(productoMock);
    });

    test("Fallo en la obtencion de producto por su ID", async () => {
        // Mock que simula que no se encuentra el producto
        productoRepository.findById.mockRejectedValue(new NotFoundError("6720c8a4c4a32d001f21ab45"));

        // Ejecutar y verificar el error
        await expect(productoService.obtenerProducto("6720c8a4c4a32d001f21ab45"))
            .rejects
            .toThrow(NotFoundError);

        expect(productoRepository.findById).toHaveBeenCalledWith("6720c8a4c4a32d001f21ab45");
    });

    test("Debería llamar al repositorio con los parámetros correctos", async () => {
        const query = {
            page: 2,
            limit: 5,
            sortOrder: "desc",
            sellerId: "abc123",
            keyWord: "cable",
            category: "electricidad",
            minPrice: 100,
            maxPrice: 500,
        };

        const productosMock = [{ nombre: "Cable 2.5mm", precio: 200 }];
        productoRepository.obtenerProductosSegun.mockResolvedValue(productosMock);

        const result = await productoService.obtenerProductosSegun(query);

        expect(productoRepository.obtenerProductosSegun).toHaveBeenCalledWith(
            2,
            5,
            "desc",
            "abc123",
            "cable",
            "electricidad",
            100,
            500
        );

        expect(result).toEqual(productosMock);
    });

    test("Debería usar valores por defecto cuando faltan parámetros", async () => {
        const query = {}; // sin valores
        productoRepository.obtenerProductosSegun.mockResolvedValue([]);

        await productoService.obtenerProductosSegun(query);

        expect(productoRepository.obtenerProductosSegun).toHaveBeenCalledWith(
            1, // page por defecto
            10, // limit por defecto
            "asc", // sortOrder por defecto
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        );
    });
});