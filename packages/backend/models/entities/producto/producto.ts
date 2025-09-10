import {Categoria} from "../producto/categoria"
import { Usuario } from "../usuario/usuario";
import {Getter, Setter} from 'tslombok'

export class Producto {

  private id: number;
  private vendedor: Usuario;
  private titulo: string;
  private descripcion: string;
  private categorias: Categoria[];
  private precio: number;
  private moneda: string;
  private stock: number;
  private fotos: string[];
  private activo: boolean;

  constructor(
    vendedor: Usuario,
    titulo: string,
    descripcion: string,
    categorias: Categoria[],
    precio: number,
    moneda: string,
    stock: number,
    fotos: string[],
    activo: boolean
  ) {
    this.id = 1;
    this.vendedor = vendedor;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.categorias = categorias;
    this.precio = precio;
    this.moneda = moneda;
    this.stock = stock;
    this.fotos = fotos;
    this.activo = activo;
  }

  getId(): number {
    return this.id;
  }

  setID(new_id: number): void{
      this.id = new_id;
  }

  getStock(): number {
    return this.stock;
  }

  getTitulo(): String{
    return this.titulo;
  }

  getCategorias() : Categoria[] {
    return this.categorias;
  }

  estaDisponible(cantidad: number): boolean{

    return false;
  }

  reducirStock(cantidad: number): void{
    if (this.stock < cantidad) {
        throw new Error(`Stock insuficiente para ${this.titulo}`);
    }
    this.stock -= cantidad;
  }

  aumentarStock(cantidad: number): void{
    this.stock += cantidad;
  }
}