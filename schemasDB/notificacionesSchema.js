import mongoose from "mongoose";
import { Notificacion } from "../models/entities/notificacion/notificacion.js";

const notificacionesSchema = new mongoose.Schema(
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
      default: Date.now, // se asigna automáticamente al crearla
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

usuarioSchema.loadClass(Notificacion); //le decis que este schema corresponde a la clase usuario

export const NotificacionModel = mongoose.model("notificaciones", notificacionesSchema);