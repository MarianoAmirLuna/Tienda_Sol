import { Producto } from "../entities/producto/producto";
import { Categoria } from "../entities/producto/categoria";

export class ProductoRepository {
    //C.R.U.D basico

    productos: Producto[] = [];
    id: number;

    constructor() {
        this.productos = [];
        this.id = 1;
    }


    create(prod: Producto): Producto {
        prod.setID(this.id);
        this.id++;
        this.productos.push(prod)
        return prod;
    }

    findById(id: number): Producto | null {
        const producto = this.productos.find((unProducto) => unProducto.getId() === id);
        return producto ?? null;
    }


    findAll(): Producto[] {

        return Array.from(this.productos.values());
    }

    /*update(producto: Producto): Producto {

        if (!this.productos.has(producto.getId())) {
            throw new Error("Producto no encontrado");
        }
        this.productos.set(producto.getId(), producto);
        return producto;
    }*/

    delete(id: number): boolean {

        const indice = this.productos.findIndex(unProducto => unProducto.getId() === id);
        if (indice === -1) return false;
        const alojamiento = this.productos[indice]
        this.productos.splice(indice, 1)
        return true
    }



    actualizar(id: number, datosActualizar: any): Producto | null {

        const indice = this.productos.findIndex(prod => prod.getId() === id);

        if (indice === -1) return null;

        const alojamientoActualizado = {
            ...this.productos[indice],
            ...datosActualizar
        }

        this.productos[indice] = alojamientoActualizado

        return alojamientoActualizado
    }

    buscarPorCategoria(categorias: Categoria[]): Producto[] {
        return this.productos.filter((unProducto) => unProducto.getCategorias() == categorias);
    }

}