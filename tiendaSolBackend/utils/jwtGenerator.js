import jwt from "jsonwebtoken";

export class JWTGenerator {
  static generarToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  }

  static verificarToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
