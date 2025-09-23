import {PedidoService} from "../services/pedidoService.js";
import {jest} from '@jest/globals';
import {ItemPedido} from "../models/entities/pedido/itemPedido.js";
import {DireccionEntrega} from "../models/entities/pedido/direccionEntrega.js";
import {Producto} from "../models/entities/producto/producto.js";
import {Categoria} from "../models/entities/producto/categoria.js";
import {Pedido} from "../models/entities/pedido/pedido.js";
import {EstadoPedido} from "../models/entities/pedido/estadoPedido.js";

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

function productoConID(id) {
    const p = new Producto(
        1,
        "Zapatillas deportivas",
        "Zapatillas de running, talle 42, color azul",
        [
            new Categoria("deporte"),
            new Categoria("calzado")
        ],
        35000,
        "Chelines",
        30,
        [
            "https://example.com/img/zapatillas1.jpg",
            "https://example.com/img/zapatillas2.jpg"
        ],
        true
    );
    p.setId(id);
    return p
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

function pedidoConID(idDeseado) {
    const p = new Pedido(
        1,
        [new ItemPedido(1, 20, 100)],
        2000,
        "Chelines",
        direccionDeEntregaGlobal
    );
    p.setId(idDeseado);
    return p;

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
            actualizar: jest.fn().mockImplementation(async (id, nuevoStock) => {})
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

    test("Obtener todos los pedidos", async () => {
        // SET UP
        const pedidoFront1 = pedidoConItemPedido(new ItemPedido(1, 30, 100));
        const pedidoFront2 = pedidoConItemPedido(new ItemPedido(2, 30, 100));
        const pedidoFront3 = pedidoConItemPedido(new ItemPedido(3, 30, 100));

        const listaDePedidosFinal = [pedidoFront1,
            pedidoFront2,
            pedidoFront3];

        const pedidoRepository = {
            getPedidos: jest.fn().mockImplementation(async () => listaDePedidosFinal)
        };

        const pedidoService = new PedidoService(pedidoRepository, {});

        // Me aseguro que haya retornado lo esperado
        const pedidos = await pedidoService.listarPedidos();
        expect(pedidos).toEqual(listaDePedidosFinal);
    });

    test("Obtener 3 pedidos solo por ID", async () => {
        // SET UP
        const pedidoFront1 = pedidoConID(1);
        const pedidoFront2 = pedidoConID(2);
        const pedidoFront3 = pedidoConID(3);

        const pedidoRepository = {
            findById: jest.fn().mockImplementation(async (id) => {
                if (id === 1) return pedidoFront1;
                if (id === 2) return pedidoFront2;
                if (id === 3) return pedidoFront3;
                return null;
            })
        };

        const pedidoService = new PedidoService(pedidoRepository, {});

        const pedidos1 = await pedidoService.obtenerPedido(1);
        expect(pedidoRepository.findById).toHaveBeenCalledWith(1);
        const pedidos2 = await pedidoService.obtenerPedido(2);
        expect(pedidoRepository.findById).toHaveBeenCalledWith(2);
        const pedidos3 = await pedidoService.obtenerPedido(3);
        expect(pedidoRepository.findById).toHaveBeenCalledWith(3);

        // Me aseguro que haya retornado lo esperado
        expect(pedidos1).toEqual(pedidoFront1);
        expect(pedidos2).toEqual(pedidoFront2);
        expect(pedidos3).toEqual(pedidoFront3);
    });

    /* No esta hecha la lógica de eliminar pedido, grande JS que no nos advirtio
    test("Eliminar 1 pedido por su ID", async () => {
        // SET UP
        const pedidoFront1 = pedidoConID(1);
        const pedidoFront2 = pedidoConID(2);
        const pedidoFront3 = pedidoConID(3);

        const pedidoRepository = {
            findById: jest.fn().mockImplementation(async (id) => {
                if (id === 1) return pedidoFront1;
                if (id === 2) return pedidoFront2;
                if (id === 3) return pedidoFront3;
                return null;
            })
        };

        const pedidoService = new PedidoService(pedidoRepository, {});

    });
    */

    test("Cancelar un Pedido exitosamente", async () => {
        // SET UP
        const pedidoFront = pedidoConID(1);
        const pedidoFinal = pedidoConID(1);
        pedidoFinal.cambiarEstado(EstadoPedido.CANCELADO)

        const pedidoRepository = {
            actualizar: jest.fn().mockImplementation(async () => {})
        };

        const pedidoService = new PedidoService(pedidoRepository, {});

        const pedidoCancelado = await pedidoService.cancelarPedido(pedidoFront);
        expect(pedidoRepository.actualizar).toHaveBeenCalledWith(pedidoFinal);
        expect(pedidoCancelado).toEqual(pedidoFinal);
    });

    test("Cancelar un Pedido fallidamente", async () => {
        // SET UP
        const pedidoFront = pedidoConID(1);
        pedidoFront.cambiarEstado(EstadoPedido.ENVIADO);

        const pedidoService = new PedidoService({}, {});

        const pedidoCancelado = await pedidoService.cancelarPedido(pedidoFront);
        expect(pedidoCancelado).toEqual(null);
    });

    test("Enviar un Pedido exitosamente", async () => {
        // SET UP
        const pedidoFront = pedidoConID(1);
        const pedidoFinal = pedidoConID(1);
        pedidoFinal.cambiarEstado(EstadoPedido.ENVIADO)

        const pedidoRepository = {
            actualizar: jest.fn().mockImplementation(async () => {})
        };
        const productoRepository = {
            findById: jest.fn().mockImplementation(async (id) => productoConID(1))
        };

        const pedidoService = new PedidoService(pedidoRepository, productoRepository);

        const pedidoEnviado = await pedidoService.enviarPedido(pedidoFront);
        expect(pedidoRepository.actualizar).toHaveBeenCalledWith(pedidoFinal);
        expect(productoRepository.findById).toHaveBeenCalledWith(1);
        expect(pedidoEnviado).toEqual(pedidoFinal);
    });

/*
    test("Enviar un Pedido fallidamente", async () => {
        // SET UP
        const pedidoFront = pedidoConID(1);
        pedidoFront.cambiarEstado(EstadoPedido.ENVIADO);

        const pedidoService = new PedidoService({}, {});

        const pedidoCancelado = await pedidoService.cancelarPedido(pedidoFront);
        expect(pedidoCancelado).toEqual(null);
    });*/
});
