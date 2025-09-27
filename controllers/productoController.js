import {Producto} from "../models/entities/producto/producto.js";
import {productoSchema} from "../middleware/schemas/productoSchema.js";


export class ProductoController {

    constructor(productoService) {
        this.productoService = productoService;
    }


    crearProducto(req, res, next) {
        const nuevoProducto = productoSchema.parsearProducto(req);
        this.productoService.crearProducto(nuevoProducto)
            .then(producto => { res.status(201).json(producto) })
            .catch(error => { next(error) });
    }


    obtenerProducto(req, res, next) {
        const idResult = productoSchema.parsearId(req);
        this.productoService.obtenerProducto(idResult)
            .then(producto => res.status(200).json(producto))
            .catch(error => { next(error) });
    }

    listarProductos(req, res, next) {
        const idResult = productoSchema.parsearId(req);
        this.productoService.listarProductos(idResult)
        .then(productos => res.status(200).json(productos))
        .catch(error => { next(error) });
    }


    actualizarProducto(req, res, next) {
        const resultId = productoSchema.parsearId(req);
        const resultBody = productoSchema.parsearProducto(req);

        this.productoService.actualizar(resultId, resultBody)
            .then(productoActualizado => res.status(200).json(productoActualizado))
            .catch(next);
    }


    eliminarProducto(req, res, next) {

        const idResult = productoSchema.parsearId(req);

        this.productoService.eliminarProducto(idResult)
            .then(() => res.status(200).json({mensaje: `Producto id: ${idResult} eliminado`}))
            .catch((error) => next(error));
    }
}