import "dotenv/config";
import express from "express";
import cors from "cors";
import { ProductoRepository } from "./models/repository/productoRepository.js";
import { ProductoService } from "./services/productoService.js";
import { ProductoController } from "./controllers/productoController.js";
import { PedidoRepository } from "./models/repository/pedidoRepository.js";
import { PedidoService } from "./services/pedidoService.js";
import { PedidoController } from "./controllers/pedidoController.js";
import { UsuarioRepository } from "./models/repository/usuarioRepository.js";
import { UsuarioService } from "./services/usuarioService.js";
import { UsuarioController } from "./controllers/usuarioController.js";

import { Server } from "./server.js";
import routes from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : true,
  })
);

// health check
app.get("/hello", (req, res) => {
  res.json({ message: "hello world" });
});

const PORT = Number(process.env.SERVER_PORT) || 8000;

// Se envía al server el puerto
const server = new Server(app, PORT);

const productoRepo = new ProductoRepository();
const productoService = new ProductoService(productoRepo);
const productoController = new ProductoController(productoService);

server.setController(ProductoController, productoController);

// Pedidos
const pedidoRepo = new PedidoRepository();
const pedidoService = new PedidoService(pedidoRepo, productoRepo);
const pedidoController = new PedidoController(pedidoService);

server.setController(PedidoController, pedidoController);

// usuario
const usuarioRepo = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepo, pedidoRepo);
const usuarioController = new UsuarioController(usuarioService);

server.setController(UsuarioController, usuarioController);

routes.forEach((route) => server.addRoute(route));
server.configureRoutes();
server.launch();

// app.listen(PORT, () => {
//   console.log(`Backend escuchando en puerto ${PORT}`);
// });
export default app;