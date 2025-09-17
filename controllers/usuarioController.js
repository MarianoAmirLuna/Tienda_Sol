import { z } from "zod";
import { Usuario } from "../models/entities/usuario/usuario.js";

const usuarioSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Formato de email inválido"),
  telefono: z.string().min(6, "El teléfono debe tener al menos 6 dígitos"),
  tipo: z.enum(["COMPRADOR", "VENDEDOR", "ADMIN"]), // podés ajustar según tus tipos
});

const idTransform = z.string().transform((val, ctx) => {
  const num = Number(val);
  if (isNaN(num)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "id must be a number",
    });
    return z.NEVER;
  }
  return num;
});

export class UsuarioController {

  constructor(usuarioService) {
    this.usuarioService = usuarioService
  }

  crearUsuario(req, res) {

    const result = usuarioSchema.safeParse(req.body);
    if (result.error) {
      return res.status(400).json(result.error.issues)
    };

    const nuevoUsuario = new Usuario(
      result.data.nombre,
      result.data.email,
      result.data.telefono,
      result.data.tipo
    )

    this.usuarioService.crearUsuario(nuevoUsuario);

    res.status(201).json(nuevoUsuario);
  }

  historialPedidos(req, res){
    const idResult = idTransform.safeParse(req.params.id);
    if (idResult.error) return res.status(400).json(idResult.error.issues);
    
    res.status(201).json(this.usuarioService.historialPedidos(idResult.data));
  }

}