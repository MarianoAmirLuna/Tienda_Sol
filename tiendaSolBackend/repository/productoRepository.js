import { ProductoModel } from "../schemasDB/productoSchema.js";
import { NotFoundError } from "../middleware/appError.js";

import { BadQuery } from "../middleware/appError.js";

export class ProductoRepository {
  constructor() {
    this.productoSchema = ProductoModel;
  }

  async create(prod) {
    const producto = new this.productoSchema(prod);
    return await producto.save();
  }

  async findById(id) {
    const producto = await this.productoSchema.findById(id);

    if (!producto) throw new NotFoundError(`${id}`);
    return producto;
  }

  sortOrderToTypeOfFilter(sortOrder) {
    if (sortOrder === "asc") {
      return { precio: 1 };
    } //Precio ascendente (menor a mayor)
    if (sortOrder === "desc") {
      return { precio: -1 };
    } // Precio descendente (mayor a menor)
    if (sortOrder === "masVendido") {
      return { unidadesVendidas: -1 };
    }

    throw new BadQuery(`${sortOrder}`);
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
    const skip = (page - 1) * limit;

    
    //
    const filtros = {};

    if (sellerId) filtros.vendedor = sellerId;
    if (category) filtros.categoria = category;
    if (keyWord) {
      filtros.$or = [
        { nombre: { $regex: keyWord, $options: "i" } },
        { descripcion: { $regex: keyWord, $options: "i" } }, //la i es case insensitive
      ];
    }
    if (minPrice || maxPrice) {
      filtros.precio = {};
      if (minPrice) filtros.precio.$gte = Number(minPrice); //gte equivale a >=
      if (maxPrice) filtros.precio.$lte = Number(maxPrice); //gte equivale a <=
    }
    //
    return await this.productoSchema
      .find(filtros)
      .sort(this.sortOrderToTypeOfFilter(sortOrder))
      .limit(limit)
      .skip(skip);
  }

  async update(id, camposActualizados) {
    const productoActualizado = await this.productoSchema.findByIdAndUpdate(
      id,
      { $set: camposActualizados },
      { new: true, runValidators: true } // devuelve el nuevo documento validado
    );

    if (!productoActualizado) throw new NotFoundError(`${id}`);

    return productoActualizado;
  }

  async save(producto) {
    return await producto.save();
  }

  async delete(id) {
    const productoEliminado = await this.productoSchema.findByIdAndDelete(id);
    if (!productoEliminado) throw new NotFoundError(`${id}`);

    return productoEliminado;
  }
}
