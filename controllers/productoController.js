import {Producto} from "../models/entities/producto/producto.js";
import {productoSchema} from "../Middleware/schemas/productoSchema.js";


export class ProductoController {

    constructor(productoService) {
        this.productoService = productoService;
    }

    async crearProducto(req, res) {
        const nuevoProducto = productoSchema.parsearProducto(req);

        const p = await this.productoService.crearProducto(nuevoProducto);
        res.status(201).json(p);
    }

    obtenerProducto(req, res) {
        const idResult = productoSchema.idTransform.safeParse(req.params.id);
        if (idResult.error) return res.status(400).json(idResult.error.issues);
        const producto = this.productoService.obtenerProducto(idResult.data);
        if (!producto) {
            return res.status(404).json({error: "Producto no encontrado"});
        }
        return res.status(200).json(producto);
    }

    eliminarProducto(req, res) {
        const idResult = idTransform.safeParse(req.params.id);
        if (idResult.error) return res.status(400).json(idResult.error.issues);
        const eliminado = this.productoService.eliminarProducto(idResult.data);
        if (!eliminado) return res.status(404).json({error: "Producto no encontrado"});
        res.json({mensaje: "Producto eliminado"});
    }

    listarProductos(req, res) {
        try {
            const productos = this.productoService.listarProductos();
            if (productos.length === 0) {
                return res.status(204).send(); // No Content si no hay productos
            }
            res.json(productos);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

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

    buscarPorCategoria(req, res) {

        const unaCategoria = productoSchema.safeParse(req.params.categoria);
        if (unaCategoria.error) return res.status(400).json(unaCategoria.error.issues);
        const productos = this.productoService.buscarPorCategoria(unaCategoria.data.categorias);
        res.status(200).json(productos);
    }
}