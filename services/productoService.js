import { NotFoundError } from "../middleware/appError.js";

export class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }


    async crearProducto(producto) {
        const nuevoProducto = await this.productoRepository.create(producto);
        return nuevoProducto;
    }


    async obtenerProducto(id) {
        const producto = await this.productoRepository.findById(id);
        if (!producto) throw new NotFoundError(`${id}`);
        return producto;
    }


    async listarProductos() {
        const productos = await this.productoRepository.findAll();
        return productos;
    }


    async actualizar(id, productoActualizado) {

        productoActualizado.setId(id);
        const productoGuardado = await this.productoRepository.update(id, productoActualizado);
        
        if (!productoGuardado) throw new NotFoundError(`${id}`);
        
        return productoGuardado;
    }


    async eliminarProducto(id) {
        const prod = await this.productoRepository.delete(id);
        if (!prod) throw new NotFoundError(`${id}`);
    }


    async actualizarStock(id, cantidadComprada) {
        const unProducto = await this.obtenerProducto(id);
        unProducto.reducirStock(cantidadComprada);

        return this.productoRepository.update(id, unProducto);

    }
}
