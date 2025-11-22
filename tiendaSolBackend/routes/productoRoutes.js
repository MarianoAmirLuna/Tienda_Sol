import express from "express";
import { ProductoController } from "../controllers/productoController.js";

const pathProducto = "/productos";
const pathProductoID = "/productos/:id";

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos del catálogo
 */
export default function productoRoutes(getController) {
    const router = express.Router();

    /**
     * @swagger
     * /productos:
     *   post:
     *     summary: Crear un nuevo producto
     *     tags: [Productos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nombre
     *               - precio
     *               - stock
     *             properties:
     *               nombre:
     *                 type: string
     *                 example: "Laptop Gaming"
     *               descripcion:
     *                 type: string
     *                 example: "Laptop para gaming de alta gama"
     *               precio:
     *                 type: number
     *                 format: float
     *                 example: 1299.99
     *               stock:
     *                 type: integer
     *                 example: 15
     *               categoria:
     *                 type: string
     *                 example: "Tecnología"
     *               vendedorId:
     *                 type: string
     *                 example: "507f1f77bcf86cd799439013"
     *     responses:
     *       201:
     *         description: Producto creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Producto'
     *       400:
     *         description: Error en los datos del producto
     */
    router.post(pathProducto, (req, res, next) => {
        getController(ProductoController).crearProducto(req, res, next);
    });

    router.get(pathProductoID, (req, res, next) => {
        getController(ProductoController).obtenerProducto(req,res,next);
    })

    /**
     * @swagger
     * /productos:
     *   get:
     *     summary: Obtener todos los productos
     *     tags: [Productos]
     *     parameters:
     *       - in: query
     *         name: categoria
     *         schema:
     *           type: string
     *         description: Filtrar por categoría
     *       - in: query
     *         name: vendedor
     *         schema:
     *           type: string
     *         description: Filtrar por ID de vendedor
     *     responses:
     *       200:
     *         description: Lista de productos obtenida exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Producto'
     */
    router.get(pathProducto, (req, res, next) => {
        getController(ProductoController).obtenerProductosSegun(req, res, next);
    });

    /**
     * @swagger
     * /productos/{id}:
     *   patch:
     *     summary: Actualizar un producto
     *     tags: [Productos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del producto
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nombre:
     *                 type: string
     *               descripcion:
     *                 type: string
     *               precio:
     *                 type: number
     *               stock:
     *                 type: integer
     *               categoria:
     *                 type: string
     *     responses:
     *       200:
     *         description: Producto actualizado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Producto'
     *       404:
     *         description: Producto no encontrado
     */
    router.patch(pathProductoID, (req, res, next) => {
        getController(ProductoController).actualizarProducto(req, res, next);
    });

    /**
     * @swagger
     * /productos/{id}:
     *   delete:
     *     summary: Eliminar un producto
     *     tags: [Productos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del producto
     *     responses:
     *       200:
     *         description: Producto eliminado exitosamente
     *       404:
     *         description: Producto no encontrado
     */
    router.delete(pathProductoID, (req, res, next) => {
        getController(ProductoController).eliminarProducto(req, res, next);
    });

    return router;
}