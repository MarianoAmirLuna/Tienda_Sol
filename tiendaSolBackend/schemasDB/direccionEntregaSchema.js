import mongoose from "mongoose";
import { DireccionEntrega } from "../models/entities/pedido/direccionEntrega.js";

const direccionEntregaSchema = new mongoose.Schema(
  {
    calle: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "direcciones_entrega",
  }
);

direccionEntregaSchema.loadClass(DireccionEntrega);
export const DireccionEntregaModel = mongoose.model(
  "DireccionEntrega",
  direccionEntregaSchema
);
