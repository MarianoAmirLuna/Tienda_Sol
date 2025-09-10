import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { ProductoRepository } from "./models/repository/productoRepository";
import { ProductoService } from "./services/productoService";
import { ProductoController } from "./controllers/productoController";

import { Server } from "./server";
import routes from "./routes/routes";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : true,
  }),
);

app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

const PORT = Number(process.env.SERVER_PORT) || 8000;

// Se envía al server el puerto
const server = new Server(app, PORT)


const productoRepo = new ProductoRepository()
const productoService = new ProductoService(productoRepo)
const productoController = new ProductoController(productoService);

server.setController(ProductoController, productoController);

routes.forEach(route => server.addRoute(route))
server.configureRoutes();
server.launch();

// app.listen(PORT, () => {
//   console.log(`Backend escuchando en puerto ${PORT}`);
// });