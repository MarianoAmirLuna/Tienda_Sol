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

  async obtenerProductosSegun(
    page,
    limit,
    sortOrder,
    sellerId,
    keyWord,
    category,
    minPrice,
    maxPrice
  ) {
    return await this.productoRepository.obtenerProductosSegun(
      page,
      limit,
      sortOrder,
      sellerId,
      keyWord,
      category,
      minPrice,
      maxPrice
    );
  }

  async actualizar(id, camposActualizados) {
    return await this.productoRepository.update(id, camposActualizados);
  }

  async actualizarStock(id, unidades, modificarStock) {
    const unProducto = await this.obtenerProducto(id);

    modificarStock(unProducto, unidades);

    // Guardar los cambios
    return await this.productoRepository.save(unProducto);
  }

  async eliminarProducto(id) {
    return await this.productoRepository.delete(id);
  }
}
