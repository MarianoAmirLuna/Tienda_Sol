import { z } from "zod";
import { Pedido } from "../models/entities/pedido/pedido.js";
import { ItemPedido } from "../models/entities/pedido/itemPedido.js";

//import express from "express";

const MonedaEnum = z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]); // enum de monedas

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
  cantidad: z.number().int().nonnegative()
});

const pedidoSchema = z.object({
  comprador: z.number().int().nonnegative(),
  items: z.array(itemPedido),
  //total: z.number().int().nonnegative(),
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

  crearPedido(req, res) {
    const result = pedidoSchema.safeParse(req.body);
    let totalCalculado = 0;

    if (result.error) {
      return res.status(400).json(result.error.issues);
    }

    const itemsInstanciados = result.data.items.map(
      (i) => {
          let precioUnitarioActual = this.pedidoService.getPrecioUnitario(i.producto)
          totalCalculado += precioUnitarioActual * i.cantidad;
          return new ItemPedido(i.producto, i.cantidad, precioUnitarioActual)
      }
    );

    const nuevoPedido = new Pedido(
      result.data.comprador,
      itemsInstanciados,
      totalCalculado,
      result.data.moneda,
      result.data.direccionEntrega
    );

    this.pedidoService.crearPedido(nuevoPedido);
    res.status(201).json(nuevoPedido);
  }

  //Brandon, por qué aceptas req como parametro si no lo usas?
  listarPedidos(req, res) {
    try {
      const pedidos = this.pedidoService.listarPedidos(); // devuelve directamente un array o undefined

      if (!pedidos || pedidos.length === 0) {
        return res.status(404).json({ error: "No se encontraron pedidos" });
      }

      return res.status(200).json({ pedidos });
    } catch (error) {
      // Captura errores inesperados, por ejemplo si la base de datos lanza un error
      return res.status(500).json({ error: error.message || "Error interno" });
    }
  }

  obtenerPedido(req, res) {
    const idResult = idTransform.safeParse(req.params.id);

    if (idResult.error) return res.status(400).json(idResult.error.issues);

    const pedido = this.pedidoService.obtenerPedido(idResult.data);

    if (!pedido) {
      return res.status(404).json({
        error: `Pedido con id: ${idResult.data} no encontrado`,
      });
    }

    return res.status(201).json(pedido);
  }

  cancelarPedido(req, res){
    const idResult = idTransform.safeParse(req.params.id);

    if (idResult.error) return res.status(400).json(idResult.error.issues);

    const pedido = this.pedidoService.obtenerPedido(idResult.data);
    if (!pedido) {
      return res.status(404).json({
        error: `Pedido con id: ${idResult.data} no encontrado`
      });
    }

    if(!this.pedidoService.puedeCancelarPedido(pedido)) {
        return res.status(400).json({
            error: `Pedido con id: ${idResult.data} no puede ser cancelado, porque el estado es ${pedido.getEstado()}`
        });
    }

    this.pedidoService.cancelarPedido(pedido)

    return res.status(200).json({mensaje: "Pedido cancelado con éxito"});
  }

  marcarEnviado(req, res) {
    const idResult = idTransform.safeParse(req.params.id);

    if (idResult.error) return res.status(400).json(idResult.error.issues);

    const pedido = this.pedidoService.obtenerPedido(idResult.data);

    if (!pedido) {
      return res.status(404).json({
        error: `Pedido con id: ${idResult.data} no encontrado`,
      });
    }

    if (!this.pedidoService.puedeEnviarPedido(pedido)) {
      return res.status(404).json({
        error: `Pedido con id: ${idResult.data} no puede ser enviado.`,
      });
    }

    this.pedidoService.enviarPedido(pedido);
    return res
      .status(200)
      .json({ mensaje: "Pedido marcado como enviado con éxito" });
  }
}
