import { NotFoundError } from "../middleware/appError.js";

export class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }

    crearProducto(producto) {
        return this.productoRepository.create(producto);
    }


    async obtenerProducto(id) {
        const producto = await this.productoRepository.findById(id);
        if (!producto) throw new NotFoundError(`${id}`);
        return producto;
    }


    listarProductos() {
        return this.productoRepository.findAll();
    }

    async actualizar(id, productoActualizado) {

        const productoGuardado = await this.productoRepository.update(id, productoActualizado);
        
        if (!productoGuardado) throw new NotFoundError(`${id}`);
        
        return productoGuardado;
    }

    async eliminarProducto(id) {
        const prod = await this.productoRepository.delete(id);
        if (!prod) throw new NotFoundError(`${id}`);
    }

    // validarStock(id, cantidad) {
    //   const producto = this.productoRepository.findById(id);
    //   if (!producto) {
    //     throw new Error("Producto no encontrado");
    //   }
    //   return producto.getStock() >= cantidad;
    // }

    // reducirStock(id, cantidad) {
    //   const producto = this.obtenerProducto(id);
    //   producto.reducirStock(cantidad);
    //   return this.productoRepository.update(producto);
    // }

    // aumentarStock(id, cantidad) {
    //   const producto = this.obtenerProducto(id);
    //   producto.aumentarStock(cantidad);
    //   return this.productoRepository.update(producto);
    // }
}
