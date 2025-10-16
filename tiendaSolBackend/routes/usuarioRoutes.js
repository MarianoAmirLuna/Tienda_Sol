import express from "express";
import { UsuarioController } from "../controllers/usuarioController.js";

const pathUsuario = "/usuarios";
const pathUsuarioId = "/usuarios/:id";
const pathNotificacionID = "/notificaciones/:idNotificacion"

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios del sistema
 */
export default function usuarioRoutes(getController) {
    const router = express.Router();

    /**
     * @swagger
     * /usuarios:
     *   post:
     *     summary: Crear un nuevo usuario
     *     tags: [Usuarios]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nombre
     *               - email
     *             properties:
     *               nombre:
     *                 type: string
     *                 example: "Juan Pérez"
     *               email:
     *                 type: string
     *                 example: "juan@email.com"
     *               rol:
     *                 type: string
     *                 enum: [CLIENTE, VENDEDOR, ADMIN]
     *                 example: "CLIENTE"
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Usuario'
     *       400:
     *         description: Error en los datos proporcionados
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.post(pathUsuario, (req, res, next) => {
        getController(UsuarioController).crearUsuario(req, res, next);
    });

    /**
     * @swagger
     * /usuarios/{id}:
     *   get:
     *     summary: Obtener un usuario por ID
     *     tags: [Usuarios]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del usuario
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Usuario'
     *       404:
     *         description: Usuario no encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get(pathUsuarioId, (req, res, next) => {
        getController(UsuarioController).obtenerUsuario(req, res, next);
    });

    /**
     * @swagger
     * /usuarios/historialPedidos/{id}:
     *   get:
     *     summary: Obtener historial de pedidos de un usuario
     *     tags: [Usuarios]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del usuario
     *     responses:
     *       200:
     *         description: Historial de pedidos obtenido exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Pedido'
     *       404:
     *         description: Usuario no encontrado
     */
    router.get(pathUsuarioId + "/historialPedidos", (req, res, next) => {
        getController(UsuarioController).historialPedidos(req, res, next);
    });

    /**
     * @swagger
     * tags:
     *   name: Notificaciones
     *   description: Gestión de notificaciones de usuarios
     */

    /**
     * @swagger
     * /usuarios/notificaciones/{id}:
     *   get:
     *     summary: Obtener notificaciones de un usuario
     *     tags: [Notificaciones]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del usuario
     *     responses:
     *       200:
     *         description: Lista de notificaciones obtenida exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Notificacion'
     *       404:
     *         description: Usuario no encontrado
     */
    router.get(pathUsuarioId + "/notificaciones", (req, res, next) => {
        getController(UsuarioController).obtenerNotificaciones(req, res, next);
    });

    /**
     * @swagger
     * /usuarios/notificaciones/{id}:
     *   patch:
     *     summary: Marcar notificación como leída
     *     tags: [Notificaciones]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la notificación
     *     responses:
     *       200:
     *         description: Notificación marcada como leída exitosamente
     *       404:
     *         description: Notificación no encontrada
     */
    router.patch(pathUsuarioId + pathNotificacionID, (req, res, next) => {
        getController(UsuarioController).marcarLectura(req, res, next);
    });

    return router;
}