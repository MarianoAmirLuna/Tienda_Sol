import {z} from "zod";
import {Categoria} from "../../models/entities/producto/categoria.js";
import {Usuario} from "../../models/entities/usuario/usuario.js";
import {schemaBase} from "./SchemaBase.js";
import {Producto} from "../../models/entities/producto/producto.js";

export const
    productSchema = z.object({
        // id: z.number(),
        titulo: z.string(),
        descripcion: z.string().default(""),
        precio: z.number().nonnegative(),
        moneda: z.string().default("ARS"),
        stock: z.number().int().nonnegative(),
        fotos: z.array(z.string()).default([]),
        activo: z.boolean().default(true),
        categorias: z.array(z.object({nombre: z.string()}))
            .transform(cats => cats.map(cat => new Categoria(cat.nombre))),
        vendedor: z.number().int().nonnegative(),
        createdAt: z.preprocess(arg => {
            if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
        }, z.date()).default(() => new Date()),
        updatedAt: z.preprocess(arg => {
            if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
        }, z.date()).default(() => new Date()),
    });

export class productoSchema extends schemaBase {

    static parsearProducto(req) {
        const result = productSchema.safeParse(req.body);

        if (result.error) {
            throw result.error;
        }

        return new Producto(
            result.data.vendedor,
            result.data.titulo,
            result.data.descripcion,
            result.data.categorias,
            result.data.precio,
            result.data.moneda,
            result.data.stock,
            result.data.fotos,
            result.data.activo
        );
    }
}
