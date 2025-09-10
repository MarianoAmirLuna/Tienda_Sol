import { ProductoService } from "@/services/productoService";
import { z } from "zod";
import { Request, Response } from "express";
import { Producto } from "@/models/entities/producto/producto";
import { Categoria } from "@/models/entities/producto/categoria";
import { TipoUsuario } from "@/models/entities/usuario/tipoUsuario"
import { Usuario } from "@/models/entities/usuario/usuario"


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
  vendedor: z
    .object({
      nombre: z.string(),
      email: z.string().email(),
      telefono: z.string(),
      tipo: z.nativeEnum(TipoUsuario),
      fechaAlta: z.preprocess(arg => {
        if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
      }, z.date())
    })
    .transform(
      seller =>
        new Usuario(
          seller.nombre,
          seller.email,
          seller.telefono,
          seller.tipo,
          seller.fechaAlta
        )
    ),
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

  private productoService: ProductoService;

  constructor(productoService: ProductoService) {
    this.productoService = productoService;
  }

  crearProducto(req: Request, res: Response) {

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


  obtenerProducto(req: Request, res: Response) {

    const idResult = idTransform.safeParse(req.params.id);

    if (idResult.error) return res.status(400).json(idResult.error.issues);

    const producto = this.productoService.obtenerProducto(idResult.data);

    if(!producto){
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(201).json(producto);
  }


  eliminarProducto(req: Request, res: Response) {

    const idResult = idTransform.safeParse(req.params.id);

    if (idResult.error) return res.status(400).json(idResult.error.issues);

    const eliminado = this.productoService.eliminarProducto(idResult.data);
    if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });

    res.json({ mensaje: "Producto eliminado" });
  }

  listarProductos(req: Request, res: Response) {

    try {
      const productos = this.productoService.listarProductos();
      if (productos.length === 0) {
        return res.status(204).send(); // No Content si no hay productos
      }
      res.json(productos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }


  //Joaco
  actualizarProducto(req: Request, res: Response) {

    const productoUpdateSchema = productoSchema.partial();

    const resultId = idTransform.safeParse(req.params.id)

    if (resultId.error) {
      res.status(400).json(resultId.error.issues)
      return
    }

    const id = resultId.data

    const body = req.body
    const resultBody = productoUpdateSchema.safeParse(body)

    const productoActualizado = this.productoService.actualizar(id, resultBody)

    if (!productoActualizado) {
      res.status(404).json({
        error: "No existe el producto que se quiere modificar."
      })
    }

    res.status(200).json(productoActualizado);
  }

  //Bran
  buscarPorCategoria(req: Request, res: Response) {
    const unaCategoria = productoSchema.safeParse(req.params.categoria);

    if (unaCategoria.error) return res.status(400).json(unaCategoria.error.issues);

    const productos = this.productoService.buscarPorCategoria(unaCategoria.data.categorias);
  }
}