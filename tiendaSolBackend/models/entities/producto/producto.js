import { Categoria } from "./categoria.js";
import { Usuario } from "../usuario/usuario.js";
import { StockError } from "../../../middleware/appError.js";

export class Producto {
  constructor(
    vendedorID,
    nombre,
    descripcion,
    categorias,
    precio,
    moneda,
    stock,
    fotos,
    activo
  ) {
    this.vendedorID = vendedorID;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categorias = categorias; // [categoria]
    this.precio = precio; //Int
    this.moneda = moneda; //String
    this.stock = stock; //Int
    this.fotos = fotos; // [String]
    this.activo = activo; //Bool
    this.unidadesVendidas = 0;
  }

  getIdVendedor() {
    return this.vendedorID;
  }

  getPrecio() {
    return this.precio;
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

  getNombre() {
    return this.nombre;
  }

  getCategorias() {
    return this.categorias;
  }

  estaDisponible(cantidad) {
    return this.stock >= cantidad && this.activo;
  }


  reducirStock(cantidad) {
    if (this.stock < cantidad) {
      throw new StockError("id: " + this.id + ", nombre: " + this.nombre);
    }
    this.unidadesVendidas += cantidad;
    this.stock -= cantidad;
  }

  aumentarStock(cantidad) {
    
    this.stock += cantidad;
  }

  reducirUnidadesVendidas(ventas) {
    this.unidadesVendidas -= ventas;
  }

}
