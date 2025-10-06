import { NotFoundError } from "../middleware/appError.js";
import { ProductoModel } from "../schemasDB/productoSchema.js";

export class ProductoService {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async crearProducto(prod) {
    return await this.productoRepository.create(prod);
  }

  async obtenerProducto(id) {
    return await this.productoRepository.findById(id);
  }

  //TODO: Arreglar y agregar paginación
  async listarProductos() {
    return await this.productoRepository.findAll();
  }

  async obtenerProductosVendedor(condicionesDeObtencion) {
    return await this.productoRepository.findProductosVendedorFiltrados(
      condicionesDeObtencion
    );
  }

  async actualizar(id, productoActualizado) {
    return await this.productoRepository.update(id, productoActualizado);
  }

  async actualizarStock(id, cantidadComprada) {
    const unProducto = await this.obtenerProducto(id);

    // Reducir stock
    unProducto.reducirStock(cantidadComprada);

    // Guardar los cambios
    return await unProducto.save();
  }

  async eliminarProducto(id) {
    const prod = await this.productoSchema.deleteOne(id);
    if (!prod) throw new NotFoundError(`${id}`);
  }
}
