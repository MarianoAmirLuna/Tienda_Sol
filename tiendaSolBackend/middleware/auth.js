import { JWTGenerator } from "../utils/jwtGenerator.js";
import { UsuarioModel } from "../schemasDB/usuarioSchema.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token requerido",
      });
    }

    const decoded = JWTGenerator.verificarToken(token);
    const user = await UsuarioModel.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    req.user = user;
    
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};
