import {Categoria} from "../producto/categoria"
import {Getter, Setter} from 'tslombok'

export class Producto {

  @Getter
  @Setter
  private id: number;
  @Getter
  @Setter
  private vendedor: string;
  @Getter
  @Setter
  private titulo: string;
  @Getter
  @Setter
  private descripcion: string;
  @Getter
  @Setter
  private categorias: Categoria[];
  @Getter
  @Setter
  private precio: number;
  @Getter
  @Setter
  private moneda: string;
  @Getter
  @Setter
  private stock: number;
  @Getter
  @Setter
  private fotos: string[];
  @Getter
  @Setter
  private activo: boolean;

  constructor(
    id: number,
    vendedor: string,
    titulo: string,
    descripcion: string,
    categorias: Categoria[],
    precio: number,
    moneda: string,
    stock: number,
    fotos: string[],
    activo: boolean
  ) {
    this.id = id;
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

  estaDisponible(cantidad: number): boolean{

    return false;
  }

  reducirStock(cantidad: number): void{

  }

  aumentarStock(cantidad: number): void{

  }
}