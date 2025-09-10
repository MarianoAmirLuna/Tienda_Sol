import { ProductoRepository } from "@/models/repository/productoRepository";
import { Producto } from "@/models/entities/producto/producto";

export class ProductoService {
    constructor(private productoRepo: ProductoRepository) {}


    crearProducto(producto: Producto): Producto {

        return this.productoRepo.create(producto);
    }
    eliminarProducto(id: number): boolean {

        return this.productoRepo.delete(id);
    }

    obtenerProducto(id: number): Producto {

        const producto = this.productoRepo.findById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return producto;
    }

    listarProductos(): Producto[] {

        return this.productoRepo.findAll();
    }

    // validarStock(id: number, cantidad: number): boolean {

    //     const producto = this.productoRepo.findById(id);

    //     if (!producto) {
    //         throw new Error("Producto no encontrado");
    //     }
    //         return producto.getStock() >= cantidad;
    // }

    // reducirStock(id: number, cantidad: number): Producto {

    //     const producto = this.obtenerProducto(id);
    //     producto.reducirStock(cantidad);
    //     return this.productoRepo.update(producto);
    // }

    // aumentarStock(id: number, cantidad: number): Producto {

    //     const producto = this.obtenerProducto(id);
    //     producto.aumentarStock(cantidad);
    //     return this.productoRepo.update(producto);
    // }
}