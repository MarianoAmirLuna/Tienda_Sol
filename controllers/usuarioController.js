import {z} from "zod";
import {Usuario} from "../models/entities/usuario/usuario.js";
import {usuarioSchema} from "../Middleware/schemas/usuarioSchema.js";
import {asyncHandler} from "../Middleware/asyncHandler.js";


export class UsuarioController {

    constructor(usuarioService) {
        this.usuarioService = usuarioService
    }

    crearUsuario(req, res, next) {

        const nuevoUsuario = usuarioSchema.parsearUsuario(req)
        this.usuarioService.crearUsuario(nuevoUsuario)
        .then(usuarioCreado => {
            return res.status(201).json(usuarioCreado);
        })
        .catch(error => {
            next(error);
        })
    }

    historialPedidos(req, res, next) {
        const idResult = usuarioSchema.parsearId(req);
        this.usuarioService.historialPedidos(idResult)
        .then(historial => {
            return res.status(200).json(historial);
        })
        .catch(error => {
            next(error);
        })
    }

}
