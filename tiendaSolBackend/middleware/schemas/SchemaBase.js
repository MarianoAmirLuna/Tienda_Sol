export class schemaBase {
  static parsearId(req) {
    /*const result = parseInt(req.params.id, 10);
        if (result.error) {
            throw result.error;
        }
        return result;*/

    const id = req.params.id;

    if (!id || typeof id !== "string") {
      throw new Error("ID inválido: debe ser un string");
    }

    if (id.length !== 24) {
      // Los ObjectId tienen 24 caracteres
      throw new Error("ID inválido: formato incorrecto");
    }

    return id;
  }

  static parsearIdString(id) {
    if (!id || typeof id !== "string") {
      throw new Error("ID inválido: debe ser un string");
    }

    if (id.length !== 24) {
      // Los ObjectId tienen 24 caracteres
      throw new Error("ID inválido: formato incorrecto");
    }

    return id;
  }
}
