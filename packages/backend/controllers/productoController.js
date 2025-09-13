//import { ProductoService } from "../services/productoService.js";
import { z } from "zod";
import { Producto } from "../models/entities/producto/producto.js";
import { Categoria } from "../models/entities/producto/categoria.js";
//import { TipoUsuario } from "../models/entities/usuario/tipoUsuario.js";
//import { Usuario } from "../models/entities/usuario/usuario.js";
//import express from "express";

// const productoSchema = z.object({
//   id: z.number(),
//   titulo: z.string().min(3).max(50),
//   precio: z.number().nonnegative(),
//   stock: z.number().int().nonnegative(),
//   categorias: z.array(z.object({ nombre: z.string() })),
//   vendedor: z.object({ id: z.string(), nombre: z.string() }),
// });

const productoSchema = z.object({
  // id: z.number(),
  titulo: z.string(),
  descripcion: z.string().default(""),
  precio: z.number().nonnegative(),
  moneda: z.string().default("ARS"),
  stock: z.number().int().nonnegative(),
  fotos: z.array(z.string()).default([]),
  activo: z.boolean().default(true),
  categorias: z.array(z.object({ nombre: z.string() }))
    .transform(cats => cats.map(cat => new Categoria(cat.nombre))),
  vendedor: z.number().int().nonnegative(),
  createdAt: z.preprocess(arg => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()).default(() => new Date()),
  updatedAt: z.preprocess(arg => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()).default(() => new Date()),
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

export class ProductoController {

  constructor(productoService) {
    this.productoService = productoService;
  }

  crearProducto(req, res) {
    const result = productoSchema.safeParse(req.body);
    if (result.error) {
      return res.status(400).json(result.error.issues)
    };
    const nuevoProducto = new Producto(
      result.data.vendedor,
      result.data.titulo,
      result.data.descripcion,
      result.data.categorias,
      result.data.precio,
      result.data.moneda,
      result.data.stock,
      result.data.fotos,
      result.data.activo
    )
    this.productoService.crearProducto(nuevoProducto);
    res.status(201).json(nuevoProducto);
  }

  obtenerProducto(req, res) {
    const idResult = idTransform.safeParse(req.params.id);
    if (idResult.error) return res.status(400).json(idResult.error.issues);
    const producto = this.productoService.obtenerProducto(idResult.data);
    if(!producto){
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    return res.status(201).json(producto);
  }

  eliminarProducto(req, res) {
    const idResult = idTransform.safeParse(req.params.id);
    if (idResult.error) return res.status(400).json(idResult.error.issues);
    const eliminado = this.productoService.eliminarProducto(idResult.data);
    if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado" });
  }

  listarProductos(req, res) {
    try {
      const productos = this.productoService.listarProductos();
      if (productos.length === 0) {
        return res.status(204).send(); // No Content si no hay productos
      }
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //Joaco
  actualizarProducto(req, res) {

    const resultId = idTransform.safeParse(req.params.id)
    
    if (resultId.error) {
      res.status(400).json(resultId.error.issues)
      return
    }

    const resultBody = productoSchema.safeParse(req.body)
    const productoActualizado = this.productoService.actualizar(resultId.data, resultBody.data)
    if (!productoActualizado) {
      res.status(404).json({
        error: "No existe el producto que se quiere modificar."
      })
    }
    res.status(200).json(productoActualizado);
  }

  //Bran
  buscarPorCategoria(req, res) {
    const unaCategoria = productoSchema.safeParse(req.params.categoria);
    if (unaCategoria.error) return res.status(400).json(unaCategoria.error.issues);
    const productos = this.productoService.buscarPorCategoria(unaCategoria.data.categorias);
    res.status(200).json(productos);
  }
}