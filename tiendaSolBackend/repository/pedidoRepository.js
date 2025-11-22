import { PedidoModel } from "../schemasDB/pedidoSchema.js";
import { NotFoundError } from "../middleware/appError.js";
import mongoose from 'mongoose';

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


  async obtenerPedidosSegun(query) {
      const p = parseInt(query.page) || 1;
      const l = parseInt(query.limit) || 10;
      const skip = (p - 1) * l;

      const cleaned = Object.fromEntries(
          Object.entries(query).filter(([_, value]) => value != null && value !== '')
      );

      ['compradorID', 'vendedorID'].forEach(key => {
          if (cleaned[key] && mongoose.Types.ObjectId.isValid(cleaned[key])) {
              cleaned[key] = new mongoose.Types.ObjectId(cleaned[key]);
          }
      });

      if (cleaned.estado) cleaned.estado = cleaned.estado.toUpperCase();

      
      try {
          const pedidos = await this.pedidoSchema
              .find(cleaned)
              .sort({ fechaCreacion: -1 })
              .skip(skip)
              .limit(l)
              .lean();

          return pedidos;
      } catch (error) {
          throw new Error("No se pudieron obtener los pedidos.");
      }
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
