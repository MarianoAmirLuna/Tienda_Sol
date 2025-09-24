import {z} from "zod";
import {Pedido} from "../models/entities/pedido/pedido.js";
import {ItemPedido} from "../models/entities/pedido/itemPedido.js";

const MonedaEnum = z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]); // enum de monedas
const estadoSchema = z.enum(["PENDIENTE", "CONFIRMADO", "EN_PREPARACION", "ENVIADO", "ENTREGADO", "CANCELADO"]);

const direccionEntregaSchema = z.object({
    calle: z.string(),
    altura: z.string(),
    piso: z.string().optional(), // puede ser opcional
    departamento: z.string().optional(), // puede ser opcional
    codigoPostal: z.string(),
    ciudad: z.string(),
    provincia: z.string(),
    pais: z.string().default("Argentina"),
    lat: z.string().optional(),
    lng: z.string().optional(),
});

const itemPedido = z.object({
    producto: z.number().int().nonnegative(),
    cantidad: z.number().int().nonnegative(),
    precioUnitario: z.number().nonnegative().optional()
});

const pedidoSchema = z.object({
    comprador: z.number().int().nonnegative(),
    items: z.array(itemPedido),
    moneda: MonedaEnum.default("PESO_ARG"),
    direccionEntrega: direccionEntregaSchema,
});

const idTransform = z.string().transform((val, ctx) => {
    const num = Number(val);
    if (isNaN(num)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "id must be a number",
        });
        return z.NEVER;
    }
    return num;
});

export class PedidoController {
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }

    //#############
    //CREATE pedido
    //#############

    async crearPedido(req, res) {
        const result = pedidoSchema.safeParse(req.body);
        let totalCalculado = 0;

        if (result.error) {
            return res.status(400).json(result.error.issues);
        }

        const itemsInstanciados = await Promise.all(
            result.data.items.map(async (i) => {
                const precioUnitarioActual = await this.pedidoService.getPrecioUnitario(i.producto);
                totalCalculado += precioUnitarioActual * i.cantidad;
                return new ItemPedido(i.producto, i.cantidad, precioUnitarioActual);
            })
        );

        const nuevoPedido = new Pedido(
            result.data.comprador,
            itemsInstanciados,
            totalCalculado,
            result.data.moneda,
            result.data.direccionEntrega
        );

        await this.pedidoService.crearPedido(nuevoPedido);
        return res.status(201).json(nuevoPedido);
    }

    //#############
    //CREATE pedido
    //#############

    //#############
    //RETRIEVE pedido
    //#############

    async listarPedidos(req, res) {
        try {
            const pedidos = await this.pedidoService.listarPedidos(); // devuelve directamente un array o undefined

            if (!pedidos || pedidos.length === 0) {
                return res.status(404).json({error: "No se encontraron pedidos"});
            }

            return res.status(200).json({pedidos});
        } catch (error) {
            // Captura errores inesperados, por ejemplo si la base de datos lanza un error
            return res.status(500).json({error: error.message || "Error interno"});
        }
    }

    async obtenerPedido(req, res) {
        const idResult = idTransform.safeParse(req.params.id);

        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const pedido = await this.pedidoService.obtenerPedido(idResult.data);

        if (!pedido) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no encontrado`,
            });
        }

        return res.status(200).json(pedido);
    }

    //#############
    //RETRIEVE pedido
    //#############

    //#############
    //UPDATE pedido
    //#############

    async actualizarEstado(req, res) {
        const idResult = idTransform.safeParse(req.params.id);
        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const estadoResult = estadoSchema.safeParse(req.body.estado);
        if (estadoResult.error) return res.status(400).json(estadoResult.error.issues);

        const pedidoActualizado = await this.pedidoService.cambiarEstado(idResult.data, estadoResult.data);
        if (!pedidoActualizado) {
            return res.status(400).json({ error: `No se pudo cambiar el estado del pedido` });
        }
        if (pedidoActualizado == -1) {
            return res.status(404).json({ error: `Pedido con id: ${idResult.data} no encontrado` });
        }

        return res.status(200).json({
            mensaje: `Pedido actualizado al estado ${pedidoActualizado.getEstado()} con éxito`,
            pedido: pedidoActualizado
        });
    }

    /*
    async cancelarPedido(req, res) {
        const idResult = idTransform.safeParse(req.params.id);

        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const pedido = await this.pedidoService.obtenerPedido(idResult.data);
        if (!pedido) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no encontrado`
            });
        }

        const pedidoCancelado = await this.pedidoService.cancelarPedido(pedido);

        if (!pedidoCancelado) {
            return res.status(400).json({
                error: `Pedido con id: ${idResult.data} no puede ser cancelado, porque el estado es ${pedido.getEstado()}`
            });
        }

        return res.status(200).json({
                mensaje: "Pedido cancelado con éxito",
                pedido: pedidoCancelado
            }
        );
    }

    async marcarEnviado(req, res) {
        const idResult = idTransform.safeParse(req.params.id);

        if (idResult.error) return res.status(400).json(idResult.error.issues);

        const pedidoObtenido = await this.pedidoService.obtenerPedido(idResult.data);

        if (!pedidoObtenido) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no encontrado`,
            });
        }

        const pedidoEnviado = await this.pedidoService.enviarPedido(pedidoObtenido);
        if (!pedidoEnviado) {
            return res.status(404).json({
                error: `Pedido con id: ${idResult.data} no puede ser enviado.`,
            });
        }
        return res
            .status(200)
            .json({
                mensaje: "Pedido marcado como enviado con éxito",
                pedido: pedidoEnviado
            });
    }*/

    //#############
    //UPDATE pedido
    //#############

    //#############
    //DELETE pedido
    //#############

    //#############
    //DELETE pedido
    //#############
}
