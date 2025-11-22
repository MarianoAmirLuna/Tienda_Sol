import mongoose from "mongoose";
import { Producto } from "../models/entities/producto/producto.js";

const productoSchema = new mongoose.Schema(
  {
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true],
    },
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
      minlength: [10, "El nombre debe tener al menos 10 caracteres"],
      maxlength: [1000, "El nombre no puede exceder 1000 caracteres"],
    },
    categorias: {
      type: [String],
      enum: ["REMERA", "PANTALON", "ZAPATOS", "CAMPERA"],
      required: [true, "las categorias son obligatorias"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    stock: {
      type: Number,
      required: [true, "Tiene que tener un stock"],
    },
    fotos: {
      type: [String],
      required: false,
    },
    activo: {
      type: Boolean,
      required: [true, "Tenes que indicar si el producto está activo."],
    },
    unidadesVendidas: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    collection: "productos", //como se va a llamar la coleccion en la DB
  }
);

productoSchema.pre(/^find/, function (next) {
  this.populate("vendedor"); // ← nombre del CAMPO (no del modelo)
  next();
});

productoSchema.loadClass(Producto); //le decis que este schema corresponde a la clase usuario

export const ProductoModel = mongoose.model("Producto", productoSchema);
