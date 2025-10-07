import { ProductoModel } from "../schemasDB/productoSchema.js";

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

  async findProductosVendedorFiltrados(
    condicionesDeObtencion,
    page,
    documentosXpagina
  ) {
    const { sellerID, category, keyWord, minPrice, maxPrice } =
      condicionesDeObtencion;

    const skip = (page - 1) * documentosXpagina;

    console.log("la pagina: ", page);
    console.log("cuantos traer:", documentosXpagina);

    const filtros = {};

    if (sellerID) filtros.vendedor = sellerID;
    if (category) filtros.categoria = category;
    if (keyWord) {
      filtros.$or = [
        { nombre: { $regex: keyWord, $options: "i" } },
        { descripcion: { $regex: keyWord, $options: "i" } }, //la i es case insensitive
      ];
    }
    if (minPrice && maxPrice) {
      filtros.precio = {};
      if (minPrice) filtros.precio.$gte = Number(minPrice); //gte equivale a >=
      if (maxPrice) filtros.precio.$lte = Number(maxPrice); //gte equivale a <=
    }

    console.log(filtros);

    return await this.productoSchema
      .find(filtros)
      .limit(documentosXpagina)
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

  delete(id) {
    const productoEliminado = this.productoSchema.findByIdAndDelete(id);
    if (!productoEliminado) throw new NotFoundError(`${id}`);

    return productoEliminado;
  }

  async findAll(page, documentosXpagina) {
    const skip = (page - 1) * documentosXpagina;

    console.log("la pagina: ", page);
    console.log("cuantos traer:", documentosXpagina);

    return await this.productoSchema.find().limit(documentosXpagina).skip(skip);
  }
}
