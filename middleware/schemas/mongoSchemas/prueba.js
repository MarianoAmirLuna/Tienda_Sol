import mongoose from "mongoose";

// Modelo temporal para prueba
const ProductoTestSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true }
});

export const ProductoTest = mongoose.model("ProductoTest", ProductoTestSchema);
