import { Categoria } from "./categoria.js";
import { Usuario } from "../usuario/usuario.js";

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
    this.id = 1;
    this.vendedorID = vendedorID;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.categorias = categorias;
    this.precio = precio;
    this.moneda = moneda;
    this.stock = stock;
    this.fotos = fotos;
    this.activo = activo;
  }

  getVendedorID(){
    return this.vendedorID;
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

  setStock(nuevoStock){
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
      throw new Error(`Stock insuficiente para ${this.titulo}`);
    }
    this.stock -= cantidad;
  }

  aumentarStock(cantidad) {
    this.stock += cantidad;
  }
}
