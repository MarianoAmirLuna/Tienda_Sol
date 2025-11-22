import { z } from "zod";
import { Categoria } from "../../models/entities/producto/categoria.js";
import { Usuario } from "../../models/entities/usuario/usuario.js";
import { schemaBase } from "./SchemaBase.js";
import { Producto } from "../../models/entities/producto/producto.js";
import mongoose from "mongoose";

const CategoriaEnum = z.enum(["REMERA", "PANTALON", "ZAPATOS", "CAMPERA"]);

export const productSchema = z.object({
  // id: z.number(),
  nombre: z.string(),
  descripcion: z.string().default(""),
  precio: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  fotos: z.array(z.string()).default([]),
  activo: z.boolean().default(true),
  categorias: z.array(CategoriaEnum),
  vendedor: z.string(),
  createdAt: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date())
    .default(() => new Date()),
  updatedAt: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date())
    .default(() => new Date()),
});

export const searchSchema = z.object({
  sellerID: z.string(),
  category: z.array(CategoriaEnum).optional(),
  keyWord: z.string().optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().nonnegative().optional(),
});

export class productoSchema extends schemaBase {
  static parsearProducto(req) {
    const result = productSchema.safeParse(req.body);
    if (result.error) throw result.error;

    // Crear objeto plano en lugar de instancia de Producto
    return {
      vendedor: result.data.vendedor,//new mongoose.Types.ObjectId(result.data.vendedor),
      nombre: result.data.nombre,
      descripcion: result.data.descripcion,
      categorias: result.data.categorias,
      precio: result.data.precio,
      stock: result.data.stock,
      fotos: result.data.fotos,
      activo: result.data.activo,
    };
  }

  static parsearBusquedaProducto(req) {
    const result = searchSchema.safeParse(req.body);
    if (result.error) throw result.error;
    return {
      sellerID: result.data.sellerID,
      category: result.data.category,
      keyWord: result.data.keyWord,
      minPrice: result.data.minPrice,
      maxPrice: result.data.maxPrice,
    };
  }
}
