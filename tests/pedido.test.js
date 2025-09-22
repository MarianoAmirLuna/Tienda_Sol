import {PedidoService} from "../services/pedidoService.js";
import {jest} from '@jest/globals';
import {ItemPedido} from "../models/entities/pedido/itemPedido.js";
import {DireccionEntrega} from "../models/entities/pedido/direccionEntrega.js";
import {Producto} from "../models/entities/producto/producto.js";
import {Categoria} from "../models/entities/producto/categoria.js";
import {Pedido} from "../models/entities/pedido/pedido.js";

const direccionDeEntregaGlobal = new DireccionEntrega(
    "Av. Siempre Viva",
    "742",
    "",
    "B",
    "1414",
    "Merlo",
    "Buenos Aires",
    "Argentina",
    "-34.6037",
    "-34.6037")

function productoConStock(stockDeseado) {
    return new Producto(
        1,
        "Zapatillas deportivas",
        "Zapatillas de running, talle 42, color azul",
        [
            new Categoria("deporte"),
            new Categoria("calzado")
        ],
        35000,
        "Chelines",
        stockDeseado,
        [
            "https://example.com/img/zapatillas1.jpg",
            "https://example.com/img/zapatillas2.jpg"
        ],
        true
    );
}

function pedidoConItemPedido(itemDeseado) {
    return new Pedido(
        1,
        [itemDeseado],
        2000,
        "Chelines",
        direccionDeEntregaGlobal
    );
}


describe("PedidoService", () => {
    let pedidoService;

    //Si se necesita mockear algo en todos loss test va acá
    beforeEach(() => {
    });

    test("Crear pedido de un producto con stock suficiente", async () => {
        //      SET UP
        const productoFinal = productoConStock(10);
        productoFinal.setId(1);

        const pedidoFront = pedidoConItemPedido(new ItemPedido(1, 20, 100));

        const pedidoFinal = pedidoConItemPedido(new ItemPedido(1, 20, 100));
        pedidoFinal.setId(1);

        //      MOCKEO
        const pedidoRepository = {
            create: jest.fn().mockResolvedValue(pedidoFinal)
        };
        const productoRepository = {
            //Si findById no devuelve un objeto rompe porque al trabajar con objetos planos no puede llamar a sus metodos como get() o set()
            findById: jest.fn().mockImplementation(async (id) => {
                const p = productoConStock(30);
                p.setId(id);
                return p;
            }),
            actualizar: jest.fn().mockImplementation(async (id, nuevoStock) => productoFinal)
        };

        const pedidoService = new PedidoService(pedidoRepository, productoRepository);

        //      EJECUCION
        const pedidoResultante = await pedidoService.crearPedido(pedidoFront);

        //Me aseguro que los metodos mockeados fueron llamados con los parametros correctos
        expect(pedidoRepository.create).toHaveBeenCalledWith(pedidoFront);
        expect(productoRepository.actualizar).toHaveBeenCalledWith(1, productoFinal);

        //Me aseguro que haya retornado lo esperado
        expect(pedidoResultante).toEqual(pedidoFinal);
    });

    test("Crear pedido de un producto con stock insuficiente", async () => {
        // SET UP
        const productobase = productoConStock(30);
        productobase.setId(1);

        const pedidoFront = pedidoConItemPedido(new ItemPedido(1, 100, 100));

        const productoRepository = {
            findById: jest.fn().mockImplementation(async (id) => {
                const p = productoConStock(30);
                p.setId(id);
                return p;
            })
        };

        const pedidoService = new PedidoService({}, productoRepository);

        // Llamo al metodo directamente en el expect porque sino se lanza el error y no alcanza a chequear el resultado
        await expect(pedidoService.crearPedido(pedidoFront)).rejects.toThrow(
            `El producto ${productobase.getTitulo()} tiene un stock inferior, ${productobase.getStock()}, a la cantidad solicitada, 100`
        );
    });

    test("Crear pedido de un producto con ID incorrecto", async () => {
        // SET UP
        const pedidoFront = pedidoConItemPedido(new ItemPedido(2, 30, 100));

        const productoRepository = {
            findById: jest.fn().mockImplementation(async (id) => null)
        };

        const pedidoService = new PedidoService({}, productoRepository);

        // Llamo al metodo directamente en el expect porque sino se lanza el error y no alcanza a chequear el resultado
        await expect(pedidoService.crearPedido(pedidoFront)).rejects.toThrow(
            `El producto de id 2 no existe como producto`
        );
    });
});
