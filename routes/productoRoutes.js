import express from "express";
import { ProductoController } from "../controllers/productoController.js";

const pathProducto = "/productos";
const pathProductoID = "/productos/:id";

// Este getController recibe la clase del controller y devuelve la instancia
export default function productoRoutes(getController) {
  const router = express.Router();

  router.post(pathProducto, (req, res, next) => {
    getController(ProductoController).crearProducto(req, res, next);
  });

  router.get(pathProducto, (req, res, next) => {
    getController(ProductoController).listarProductos(req, res, next); //agregar paginacion HECHO
  });

  router.get(pathProductoID, (req, res, next) => {
    getController(ProductoController).obtenerProducto(req, res, next);
  });

  router.get("/searchSeller", (req, res, next) => {
    getController(ProductoController).obtenerProductosVendedor(req, res, next); //agregar paginacion HECHO
  });

  router.patch(pathProductoID, (req, res, next) => {
    getController(ProductoController).actualizarProducto(req, res, next);
  });

  router.delete(pathProductoID, (req, res, next) => {
    getController(ProductoController).eliminarProducto(req, res, next);
  });

  // TODO: implementar estas
  // buscarPorCategoria
  //buscarPorVendedor

  return router;
}
