import { NotFoundError } from "../middleware/appError.js";
import { BadQuery } from "../middleware/appError.js";
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
  async listarProductos(page, limit, sortOrder) {
    return await this.productoRepository.findAll(page, limit, sortOrder);
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

  async actualizarStock(id, unidades, modificarStock) {
    const unProducto = await this.obtenerProducto(id);

    modificarStock(unProducto, unidades);

    // Guardar los cambios
    return await unProducto.save();
  }

  async eliminarProducto(id) {
    return await this.productoRepository.delete(id);
  }
}
