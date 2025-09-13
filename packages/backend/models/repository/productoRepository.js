import { Producto } from "../entities/producto/producto.js";
import { Categoria } from "../entities/producto/categoria.js";

export class ProductoRepository {
  constructor() {
    this.productos = [];
    this.id = 1;
  }

  create(prod) {
    prod.setId(this.id);
    this.id++;
    this.productos.push(prod);
    return prod;
  }

  findById(id) {
    const producto = this.productos.find(
      (unProducto) => unProducto.getId() == id
    );
    return producto ?? null;
  }

  findAll() {
    return Array.from(this.productos.values());
  }

  /* update(producto) {
    const index = this.productos.findIndex(p => p.getId() === producto.getId());
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    this.productos[index] = producto;
    return producto;
  } */

  delete(id) {
    const indice = this.productos.findIndex(
      (unProducto) => unProducto.getId() == id
    );
    if (indice === -1) return false;

    this.productos.splice(indice, 1);
    return true;
  }

  actualizar(id, datosActualizar) {
  const indice = this.productos.findIndex((prod) => prod.getId() === id);

  if (indice === -1) return null;

  // Reemplazamos completamente el objeto
  const productoActualizado = new Producto({
    ...datosActualizar,
    id // mantenemos la id original
  });

  this.productos[indice] = productoActualizado;

  return productoActualizado;
}

  buscarPorCategoria(categorias) {
    return this.productos.filter(
      (unProducto) => unProducto.getCategorias() == categorias
    );
  }
}
