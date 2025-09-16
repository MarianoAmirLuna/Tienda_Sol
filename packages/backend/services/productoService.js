import { ProductoRepository } from "../models/repository/productoRepository.js";
import { Producto } from "../models/entities/producto/producto.js";
import { Categoria } from "../models/entities/producto/categoria.js";

export class ProductoService {
  constructor(productoRepo) {
    this.productoRepo = productoRepo;
  }

  crearProducto(producto) {
    return this.productoRepo.create(producto);
  }

  eliminarProducto(id) {
    return this.productoRepo.delete(id);
  }

  obtenerProducto(id) {
    const producto = this.productoRepo.findById(id);
    return producto;
  }

  listarProductos() {
    return this.productoRepo.getPedidos();
  }

  actualizar(id, datosActualizar) {
    const productoGuardado = this.productoRepo.actualizar(id, datosActualizar);
    return productoGuardado;
  }

  buscarPorCategoria(categorias) {
    const productos = this.productoRepo.buscarPorCategoria(categorias);
    if (!productos) {
      throw new Error("No se encontró ningún producto con esas categorías");
    }
    return productos;
  }

  // validarStock(id, cantidad) {
  //   const producto = this.productoRepo.findById(id);
  //   if (!producto) {
  //     throw new Error("Producto no encontrado");
  //   }
  //   return producto.getStock() >= cantidad;
  // }

  // reducirStock(id, cantidad) {
  //   const producto = this.obtenerProducto(id);
  //   producto.reducirStock(cantidad);
  //   return this.productoRepo.update(producto);
  // }

  // aumentarStock(id, cantidad) {
  //   const producto = this.obtenerProducto(id);
  //   producto.aumentarStock(cantidad);
  //   return this.productoRepo.update(producto);
  // }
}
