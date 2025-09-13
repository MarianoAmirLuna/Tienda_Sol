import { z } from "zod";
import { Pedido } from "../models/entities/pedido/pedido.js"
//import express from "express";

const MonedaEnum = z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]); // enum de monedas

const direccionEntregaSchema = z.object({
  calle: z.string(),
  altura: z.string(),
  piso: z.string().optional(),          // puede ser opcional
  departamento: z.string().optional(),  // puede ser opcional
  codigoPostal: z.string(),
  ciudad: z.string(),
  provincia: z.string(),
  pais: z.string().default("Argentina"),
  lat: z.string().optional(),
  lng: z.string().optional()
});

const itemPedido = z.object({
  producto: z.number().int().nonnegative(),
  cantidad: z.number().int().nonnegative()
})

const pedidoSchema = z.object({
  comprador: z.number().int().nonnegative(),
  items: z.array(itemPedido),
  total: z.number().int().nonnegative(),
  moneda: MonedaEnum.default("PESO_ARG"),
  direccionEntrega: direccionEntregaSchema
})


export class PedidoController {

  constructor(pedidoService) {
    this.pedidoService = pedidoService
  }

  crearPedido(req, res) {
    const result = pedidoSchema.safeParse(req.body);
    if (result.error) {
      return res.status(400).json(result.error.issues)
    };

    const nuevoPedido = new Pedido(
      result.data.comprador,
      result.data.items,
      result.data.total,
      result.data.moneda,
      result.data.direccionEntrega
    )

    this.pedidoService.crearPedido(nuevoPedido);
    res.status(201).json(nuevoPedido);
  }

  listarPedidos(req, res) {
    try {
      const pedidos = this.pedidoService.listarPedidos(); // devuelve directamente un array o undefined

      if (!pedidos || pedidos.length === 0) {
        return res.status(404).json({ error: 'No se encontraron pedidos' });
      }

      return res.status(200).json({ pedidos });
    } catch (error) {
      // Captura errores inesperados, por ejemplo si la base de datos lanza un error
      return res.status(500).json({ error: error.message || 'Error interno' });
    }
  }


}