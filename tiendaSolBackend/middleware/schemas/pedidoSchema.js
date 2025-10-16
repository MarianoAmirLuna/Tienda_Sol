import { z } from "zod";
import { schemaBase } from "./SchemaBase.js";
import { productSchema } from "./productoSchema.js";
import { Producto } from "../../models/entities/producto/producto.js";
import { Pedido } from "../../models/entities/pedido/pedido.js";

const MonedaEnum = z.enum(["PESO_ARG", "DOLAR_USA", "REAL"]); // enum de monedas

export const estadoSchema = z.enum([
  "PENDIENTE",
  "CONFIRMADO",
  "EN_PREPARACION",
  "ENVIADO",
  "ENTREGADO",
  "CANCELADO",
]);

const itemPedido = z.object({
  productoID: z.string(),
  cantidad: z.number().int().nonnegative(),
  precioUnitario: z.number().nonnegative().optional(),
});

const direccionEntregaSchema = z.object({
  calle: z.string(),
  altura: z.string(),
  piso: z.string().optional(),
  departamento: z.string().optional(),
  codigoPostal: z.string(),
  ciudad: z.string(),
  provincia: z.string(),
  pais: z.string().default("Argentina"),
  lat: z.string().optional(),
  lng: z.string().optional(),
});

const pedido = z.object({
  compradorID: z.string(),
  itemsPedido: z.array(itemPedido),
  moneda: MonedaEnum,
  direccionEntrega: direccionEntregaSchema,
});

export class pedidoSchema extends schemaBase {
  static parsearPedido(req) {
    const result = pedido.safeParse(req.body);
    if (result.error) {
      throw result.error;
    }

    return result;
  }

  static parsearEstado(req) {
    const nuevoEstado = estadoSchema.safeParse(req.body.estado);
    if (nuevoEstado.error) throw nuevoEstado.error;
    return nuevoEstado.data;
  }
}
