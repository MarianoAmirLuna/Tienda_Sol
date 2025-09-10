import { ProductoRepository } from "@/models/repository/productoRepository";
import { Producto } from "@/models/entities/producto/producto";
import { Categoria } from "@/models/entities/producto/categoria";

export class ProductoService {
    constructor(private productoRepo: ProductoRepository) { }


    crearProducto(producto: Producto): Producto {

        return this.productoRepo.create(producto);
    }
    eliminarProducto(id: number): boolean {

        return this.productoRepo.delete(id);
    }

    obtenerProducto(id: number): Producto | null {
        const producto = this.productoRepo.findById(id);
        return producto;
    }

    listarProductos(): Producto[] {

        return this.productoRepo.findAll();
    }

    actualizar(id: number, datosActualizar: any): Producto | null {
        const productoGuardado = this.productoRepo.actualizar(id, datosActualizar)
        return productoGuardado;
    }

    buscarPorCategoria(categorias: Categoria[]): Producto[] {
        const productos = this.productoRepo.buscarPorCategoria(categorias);
        if (!productos) {
            throw new Error("No se encontró ningún producto con esas categorías");
        }
        return productos;

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