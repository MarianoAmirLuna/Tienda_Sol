import {Categoria} from "./categoria.js";
import {Usuario} from "../usuario/usuario.js";
import { StockError } from "../../../middleware/appError.js";

export class Producto {
    constructor(
        vendedorID,
        titulo,
        descripcion,
        categorias,
        precio,
        moneda,
        stock,
        fotos,
        activo
    ) {
        this.id = -1;
        this.vendedorID = vendedorID;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.categorias = categorias; // [Categoria]
        this.precio = precio;//Int
        this.moneda = moneda;//String
        this.stock = stock;//Int
        this.fotos = fotos;// [String]
        this.activo = activo;//Bool
    }

    getIdVendedor() {
        return this.vendedorID;
    }

    getPrecio() {
        return this.precio;
    }

    getId() {
        return this.id;
    }

    setId(new_id) {
        this.id = new_id;
    }

    getStock() {
        return this.stock;
    }

    setStock(nuevoStock) {
        this.stock = nuevoStock;
    }

    getTitulo() {
        return this.titulo;
    }

    getCategorias() {
        return this.categorias;
    }

    estaDisponible(cantidad) {
        return this.stock >= cantidad && this.activo;
    }

    reducirStock(cantidad) {
        if (this.stock < cantidad) {
            throw new StockError('id: ' + this.id + ', titulo: ' + this.titulo);
        }
        this.stock -= cantidad;
    }

    aumentarStock(cantidad) {
        this.stock += cantidad;
    }
}
