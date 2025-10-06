import { z } from "zod";
import { Categoria } from "../../models/entities/producto/categoria.js";
import { Usuario } from "../../models/entities/usuario/usuario.js";
import { schemaBase } from "./SchemaBase.js";
import { Producto } from "../../models/entities/producto/producto.js";
import mongoose from "mongoose";

export const productSchema = z.object({
  // id: z.number(),
  nombre: z.string(),
  descripcion: z.string().default(""),
  precio: z.number().nonnegative(),
  moneda: z.number().default(0), // ✅ Cambiar "ARS" por 0 (número)
  stock: z.number().int().nonnegative(),
  fotos: z.array(z.string()).default([]),
  activo: z.boolean().default(true),
  categorias: z.array(z.number()).default([]),
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
  category: z.number().optional(),
  keyWord: z.string().optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().nonnegative().optional(),
});

/*export class productoSchema extends schemaBase {
  static parsearProducto(req) {
    const result = productSchema.safeParse(req.body); //le agrege el partial para que los atributos sean opcionales

    if (result.error) {
      throw result.error;
    }

    return new Producto(
      new mongoose.Types.ObjectId(result.data.vendedor),
      result.data.nombre,
      result.data.descripcion,
      result.data.categorias,
      result.data.precio,
      result.data.moneda,
      result.data.stock,
      result.data.fotos,
      result.data.activo
    );
  }
}*/

export class productoSchema extends schemaBase {
  static parsearProducto(req) {
    const result = productSchema.safeParse(req.body);
    if (result.error) throw result.error;

    // Crear objeto plano en lugar de instancia de Producto
    return {
      vendedor: new mongoose.Types.ObjectId(result.data.vendedor),
      nombre: result.data.nombre,
      descripcion: result.data.descripcion,
      categorias: result.data.categorias,
      precio: result.data.precio,
      moneda: result.data.moneda,
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
