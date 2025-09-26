import { z } from "zod";
import { Usuario } from "../models/entities/usuario/usuario.js";
import {usuarioSchema} from "../Middleware/schemas/usuarioSchema.js";
import {idTransform} from "../Middleware/schemas/usuarioSchema.js";
import {asyncHandler} from "../Middleware/asyncHandler.js";


export class UsuarioController {

  constructor(usuarioService) {
    this.usuarioService = usuarioService
  }

    crearUsuario = asyncHandler(async (req, res) => {
        // Validación con safeParse y throw del error
        const result = usuarioSchema.safeParse(req.body);

        if (result.error) {
            throw result.error;
        }

        // Tu lógica original sin el if de validación
        const nuevoUsuario = new Usuario(
            result.data.nombre,
            result.data.email,
            result.data.telefono,
            result.data.tipo
        );

        // Asegúrate de que tu service también maneje errores correctamente
        const usuarioCreado = await this.usuarioService.crearUsuario(nuevoUsuario);
        res.status(201).json(usuarioCreado);
    });

  historialPedidos(req, res){

    const idResult = idTransform.safeParse(req.params.id);

    if (idResult.error) return res.status(400).json(idResult.error.issues);

    res.status(200).json(this.usuarioService.historialPedidos(idResult.data));
  }

}