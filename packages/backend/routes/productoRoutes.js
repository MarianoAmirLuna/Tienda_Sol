import express from "express";
import { ProductoController } from "../controllers/productoController.js";

const pathProducto = "/productos";

// Este getController recibe la clase del controller y devuelve la instancia
export default function productoRoutes(getController) {
  const router = express.Router();

  router.get(pathProducto, (req, res) => {
    getController(ProductoController).listarProductos(req, res);
  });

  router.post(pathProducto, (req, res) => {
    getController(ProductoController).crearProducto(req, res);
  });

  router.get(pathProducto + "/:id", (req, res) => {
    getController(ProductoController).obtenerProducto(req, res);
  });

  router.delete(pathProducto + "/:id", (req, res) => {
    getController(ProductoController).eliminarProducto(req, res);
  });

  // TODO: falto este para completar el crud de productos
  router.put(pathProducto + "/:id", (req, res) => {
    getController(ProductoController).actualizarProducto(req, res);
  });

  router.get(pathProducto + "/categoria/:categoria", (req, res) => {
    getController(ProductoController).buscarPorCategoria(req, res);
  });

  // TODO: implementar estas
  // router.get(pathProducto + "/vendedor/:vendedorId", (req, res) => {
  //   getController(ProductoController).buscarPorVendedor(req, res);
  // });

  return router;
}
