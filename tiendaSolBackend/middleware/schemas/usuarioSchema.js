import { z } from "zod";
import { Usuario } from "../../models/entities/usuario/usuario.js";
import { schemaBase } from "./SchemaBase.js";

const userSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string(),
  password: z.string(),
  email: z.string().email("Formato de email inválido"),
  telefono: z.string().min(6, "El teléfono debe tener al menos 6 dígitos"),
});

export class usuarioSchema extends schemaBase {
  static parsearUsuario(req) {
    const result = userSchema.safeParse(req.body);

    if (result.error) {
      throw result.error;
    }

    return new Usuario(
      result.data.nombre,
      result.data.email,
      result.data.telefono,
      result.data.apellido,
      result.data.password
    );
  }
}
