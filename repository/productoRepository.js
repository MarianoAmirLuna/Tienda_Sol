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

  /*
      sellerID: result.data.sellerID,
      category: result.data.category,
      keyWord: result.data.keyWord,
      minPrice: result.data.minPrice,
      maxPrice: result.data.maxPrice,
  */

  async findProductosVendedorFiltrados(condicionesDeObtencion) {
    const { sellerID, category, keyWord, minPrice, maxPrice } =
      condicionesDeObtencion;

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

    return await this.productoSchema.find(filtros);
  }

  /*
  async findAll() {
    return;
  }
  

  findAll() {
    return Promise.resolve(this.productos);
  }
  */

  async update(id, productoActualizado) {
    const productoGuardado = await this.productoSchema.findByIdAndUpdate(
      id,
      productoActualizado
    );

    if (!productoGuardado) throw new NotFoundError(`${id}`);

    return productoGuardado;
  }

  delete(id) {
    const indice = this.productos.findIndex(
      (unProducto) => unProducto.getId() === id
    );
    if (indice === -1) return false;

    this.productos.splice(indice, 1);
    return true;
  }
}
