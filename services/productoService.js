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
  async listarProductos(page, limit) {
    return await this.productoRepository.findAll(page, limit);
  }

  async obtenerProductosVendedor(condicionesDeObtencion, page, limit) {
    return await this.productoRepository.findProductosVendedorFiltrados(
      condicionesDeObtencion,
      page,
      limit
    );
  }

  async actualizar(id, camposActualizados) {
    return await this.productoRepository.update(id, camposActualizados);
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
