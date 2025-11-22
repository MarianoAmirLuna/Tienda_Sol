import mongoose from "mongoose";
import { Usuario } from "../models/entities/usuario/usuario.js";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres"],
      maxlength: [50, "El apellido no puede exceder 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    telefono: {
      type: String,
      unique: true,
      required: [true, "El numero de telefono es obligatorio"],
      minlength: [8, "El telefono debe tener al menos 2 caracteres"],
      maxlength: [20, "El telefono no puede exceder 50 caracteres"],
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

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar passwords
usuarioSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

usuarioSchema.loadClass(Usuario); //le decis que este schema corresponde a la clase usuario

export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);
