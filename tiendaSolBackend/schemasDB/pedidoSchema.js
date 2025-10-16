import mongoose from "mongoose";
import { Pedido } from "../models/entities/pedido/pedido.js";
import { Moneda } from "../models/entities/moneda.js";
import { EstadoPedido } from "../models/entities/pedido/estadoPedido.js";

const pedidoSchema = new mongoose.Schema(
  {
    compradorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", //TODO: descomentar y arreglar
      required: true,
    },
    itemsPedido: [
      {
        productoID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
        precioUnitario: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    moneda: {
      type: String,
      enum: Moneda, // PESO_ARG, DOLAR_USA, REAL
      required: [true, "La moneda es obligatoria"],
    },
    direccionEntrega: {
      // objeto embebido
      calle: {
        type: String,
        required: true,
      },
      altura: {
        type: String,
        required: true,
      },
      piso: {
        type: String,
        default: "",
      },
      departamento: {
        type: String,
        default: "",
      },
      codigoPostal: {
        type: String,
        required: true,
      },
      ciudad: {
        type: String,
        required: true,
      },
      provincia: {
        type: String,
        required: true,
      },
      pais: {
        type: String,
        default: "Argentina",
      },
      lat: {
        type: String,
        default: "",
      },
      lng: {
        type: String,
        default: "",
      },
    },
    estado: {
      type: String,
      enum: EstadoPedido,
      default: "PENDIENTE",
      required: false,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
      required: false,
    },
    historialEstados: {
      type: [String],
      enum: EstadoPedido,
      default: [],
      required: false,
    },
  },
  {
    collection: "pedidos",
  }
);

pedidoSchema.pre("save", function (next) {
  this.total = this.itemsPedido.reduce(
    (acc, item) => acc + item.precioUnitario * item.cantidad,
    0
  );
  next();
});

pedidoSchema.loadClass(Pedido);
export const PedidoModel = mongoose.model("Pedido", pedidoSchema);
