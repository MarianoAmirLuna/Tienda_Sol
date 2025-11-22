import mongoose from "mongoose";
import { Notificacion } from "../models/entities/notificacion/notificacion.js";

const notificacionSchema = new mongoose.Schema(
  {
    usuarioDestino: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // referencia al modelo de usuario
      required: [true, "La notificación debe tener un usuario destino"],
    },
    mensaje: {
      type: String,
      required: [true, "El mensaje es obligatorio"],
      trim: true,
      minlength: [1, "El mensaje no puede estar vacío"],
      maxlength: [500, "El mensaje no puede superar los 500 caracteres"],
    },
    fechaAlta: {
      type: Date,
      default: Date.now,
    },
    leida: {
      type: Boolean,
      default: false,
    },
    fechaLeida: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "notificaciones", //como se va a llamar la coleccion en la DB
  }
);

notificacionSchema.loadClass(Notificacion); //le decis que este schema corresponde a la clase Notificacion

export const NotificacionModel = mongoose.model(
  "notificacion",
  notificacionSchema
);
