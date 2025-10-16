import express from "express";
import { PedidoController } from "../controllers/pedidoController.js";

const pathPedido = "/pedidos";

const pathPedidoId = "/pedidos/:id";

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gestión de pedidos del sistema
 */
export default function pedidoRoutes(getController) {
    const router = express.Router();

    /**
     * @swagger
     * /pedidos:
     *   post:
     *     summary: Crear un nuevo pedido
     *     tags: [Pedidos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - usuarioId
     *               - items
     *             properties:
     *               usuarioId:
     *                 type: string
     *                 description: ID del usuario que realiza el pedido
     *                 example: "507f1f77bcf86cd799439011"
     *               items:
     *                 type: array
     *                 items:
     *                   type: object
     *                   required:
     *                     - productoId
     *                     - cantidad
     *                   properties:
     *                     productoId:
     *                       type: string
     *                       example: "507f1f77bcf86cd799439012"
     *                     cantidad:
     *                       type: integer
     *                       example: 2
     *     responses:
     *       201:
     *         description: Pedido creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Pedido'
     *       400:
     *         description: Error en los datos del pedido
     *       404:
     *         description: Usuario o producto no encontrado
     */
    router.post(pathPedido, (req, res, next) => {
        getController(PedidoController).crearPedido(req, res, next);
    });

    /**
     * @swagger
     * /pedidos:
     *   get:
     *     summary: Listar todos los pedidos
     *     tags: [Pedidos]
     *     parameters:
     *       - in: query
     *         name: usuario
     *         schema:
     *           type: string
     *         description: Filtrar por ID de usuario
     *       - in: query
     *         name: estado
     *         schema:
     *           type: string
     *           enum: [PENDIENTE, CONFIRMADO, EN_CAMINO, ENTREGADO, CANCELADO]
     *         description: Filtrar por estado del pedido
     *     responses:
     *       200:
     *         description: Lista de pedidos obtenida exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Pedido'
     */
    router.get(pathPedido, (req, res, next) => {
        getController(PedidoController).listarPedidos(req, res, next);
    });

    /**
     * @swagger
     * /pedidos/{id}:
     *   get:
     *     summary: Obtener un pedido por ID
     *     tags: [Pedidos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del pedido
     *     responses:
     *       200:
     *         description: Pedido encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Pedido'
     *       404:
     *         description: Pedido no encontrado
     */
    router.get(pathPedidoId, (req, res, next) => {
        getController(PedidoController).obtenerPedido(req, res, next);
    });

    /**
     * @swagger
     * /pedidos/{id}:
     *   delete:
     *     summary: Eliminar un pedido
     *     tags: [Pedidos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del pedido
     *     responses:
     *       200:
     *         description: Pedido eliminado exitosamente
     *       404:
     *         description: Pedido no encontrado
     */
    router.delete(pathPedidoId, (req, res, next) => {
        getController(PedidoController).eliminarPedido(req, res, next);
    });

    /**
     * @swagger
     * /pedidos/{id}:
     *   patch:
     *     summary: Actualizar estado de un pedido
     *     tags: [Pedidos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del pedido
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - estado
     *             properties:
     *               estado:
     *                 type: string
     *                 enum: [PENDIENTE, CONFIRMADO, EN_CAMINO, ENTREGADO, CANCELADO]
     *                 example: "CONFIRMADO"
     *     responses:
     *       200:
     *         description: Estado del pedido actualizado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Pedido'
     *       404:
     *         description: Pedido no encontrado
     *       400:
     *         description: Estado inválido
     */
    router.patch(pathPedidoId, (req, res, next) => {
        getController(PedidoController).actualizarEstado(req, res, next);
    });

    return router;
}