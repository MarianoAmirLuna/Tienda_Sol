import { PedidoModel } from "../schemasDB/pedidoSchema.js";

export class PedidoRepository {
  constructor() {
    this.pedidoSchema = PedidoModel;
  }

  async create(pedido) {
    const nuevoPedido = new this.pedidoSchema(pedido);
    return await nuevoPedido.save();
  }

  async findById(id) {
    const pedido = await this.pedidoSchema.findById(id);

    if (!pedido) throw new NotFoundError(`${id}`);

    return pedido;
  }

  async findAll(page, documentosXpagina) {
    const skip = (page - 1) * documentosXpagina;

    return await this.pedidoSchema.find().limit(documentosXpagina).skip(skip);
  }

  delete(id) {
    const pedidoEliminado = this.pedidoSchema.findByIdAndDelete(id);
    if (!pedidoEliminado) return null;

    return pedidoEliminado;
  }

  async actualizar(id, camposActualizados) {
    const pedidoActualizado = await this.pedidoSchema.findByIdAndUpdate(
      id,
      { $set: camposActualizados },
      { new: true, runValidators: true } // devuelve el nuevo documento validado
    );

    if (!pedidoActualizado) throw new NotFoundError(`${id}`);

    return pedidoActualizado;
  }

  async historialPedidos(idBuscado, page, documentosXpagina) {
    const skip = (page - 1) * documentosXpagina;

    return await this.pedidoSchema
      .find({ compradorID: idBuscado })
      .limit(documentosXpagina)
      .skip(skip);
  }
}
