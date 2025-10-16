import mongoose from "mongoose";
import { Usuario } from "../models/entities/usuario/usuario.js";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
    },
    telefono: {
      type: String,
      unique: true,
      required: [true, "El numero de telefono es obligatorio"],
      minlength: [8, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [20, "El nombre no puede exceder 50 caracteres"],
    },
    tipo: {
      type: String,
      enum: ["COMPRADOR", "VENDEDOR", "ADMIN"],
      default: "COMPRADOR",
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    //timestamps: true, //tema de fechas
    collection: "usuarios", //como se va a llamar la coleccion en la DB
  }
);

usuarioSchema.loadClass(Usuario); //le decis que este schema corresponde a la clase usuario

export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);
