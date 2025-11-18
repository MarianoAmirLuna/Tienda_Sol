import { Pedido } from "../models/entities/pedido/pedido.js";
import { ItemPedido } from "../models/entities/pedido/itemPedido.js";
import { pedidoSchema } from "../middleware/schemas/pedidoSchema.js";
import { id } from "zod/locales";

export class PedidoController {
  constructor(pedidoService) {
    this.pedidoService = pedidoService;
  }

  obtenerPedidosSegun(req, res, next) {
    return this.pedidoService
      .obtenerPedidosSegun(req.query)
      .then((pedidos) => {
        res.status(200).json(pedidos);
      })
      .catch((error) => next(error));
  }

  crearPedido(req, res, next) {
    const result = pedidoSchema.parsearPedido(req);

    Promise.all(
      result.data.itemsPedido.map((i) => {
        return this.pedidoService
          .getPrecioUnitario(i.productoID)
          .then((precioUnitario) => {
            return new ItemPedido(i.productoID, i.cantidad, precioUnitario);
          });
      })
    )

      .then((itemsInstanciados) => {
        const nuevoPedido = new Pedido(
          result.data.compradorID,
          itemsInstanciados,
          result.data.direccionEntrega
        );

        return this.pedidoService
          .crearPedido(nuevoPedido)
          .then((nuevoPedido) => nuevoPedido);
      })

      .then((nuevoPedido) => {
        res.status(201).json(nuevoPedido);
      })
      .catch((error) => {
        next(error);
      });
  }

  listarPedidos(req, res, next) {
    const { page = 1, limit = 10 } = req.query;

    this.pedidoService
      .listarPedidos(page, limit)
      .then((pedidos) => {
        return res.status(200).json({ pedidos });
      })
      .catch((error) => next(error));
  }

  obtenerPedido(req, res, next) {
    const idResult = pedidoSchema.parsearId(req);

    this.pedidoService
      .obtenerPedido(idResult)
      .then((pedido) => res.status(200).json(pedido))
      .catch((error) => next(error));
  }

  eliminarPedido(req, res, next) {
    const idResult = pedidoSchema.parsearId(req);

    this.pedidoService
      .eliminarPedido(idResult)
      .then((pedidoEliminado) => {
        res.status(200).json({
          mensaje: `Pedido ${idResult} eliminado con éxito`,
        });
      })
      .catch((error) => next(error));
  }

  actualizarEstado(req, res, next) {
    const idResult = pedidoSchema.parsearId(req);
    const nuevoEstado = pedidoSchema.parsearEstado(req);

    this.pedidoService
      .actualizarEstado(idResult, nuevoEstado)
      .then((pedidoActualizado) => {
        res.status(200).json({
          mensaje: `Pedido actualizado al estado ${pedidoActualizado.getEstado()} con éxito`,
          pedido: pedidoActualizado,
        });
      })
      .catch((error) => next(error));
  }
}
