import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

// Importación de repositorios, servicios y controladores
import { ProductoRepository } from "./repository/productoRepository.js";
import { ProductoService } from "./services/productoService.js";
import { ProductoController } from "./controllers/productoController.js";
import { PedidoRepository } from "./repository/pedidoRepository.js";
import { PedidoService } from "./services/pedidoService.js";
import { PedidoController } from "./controllers/pedidoController.js";
import { UsuarioRepository } from "./repository/usuarioRepository.js";
import { UsuarioService } from "./services/usuarioService.js";
import { UsuarioController } from "./controllers/usuarioController.js";
import { NotificacionRepository } from "./repository/notificacionRepository.js";
import { NotificacionService } from "./services/notificacionService.js";

import { Server } from "./server.js";
import routes from "./routes/routes.js";
import { connectDB } from "./config/database.js";
import swaggerSpec from "./config/swagger.js";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
            : true,
    })
);

// Configuración de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "API Docs - TiendaSol Grupo 09",
    swaggerOptions: {
        persistAuthorization: true,
    }
}));

// health check
app.get("/health-check", (req, res) => {
    res.json({
        message: "hello world",
        timestamp: new Date().toISOString(),
        status: "healthy",
        documentation: "/api-docs"
    });
});

// Ruta para obtener el JSON de Swagger
app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

const PORT = Number(process.env.SERVER_PORT) || 8000;

// Se envía al server el puerto
const server = new Server(app, PORT);

// Notificaciones
const notificacionRepo = new NotificacionRepository();
const notificacionService = new NotificacionService(notificacionRepo);

// Productos
const productoRepo = new ProductoRepository();
const productoService = new ProductoService(productoRepo);
const productoController = new ProductoController(productoService);

server.setController(ProductoController, productoController);

// Pedidos
const pedidoRepo = new PedidoRepository();
const pedidoService = new PedidoService(
    pedidoRepo,
    productoService,
    notificacionService
);
const pedidoController = new PedidoController(pedidoService);

server.setController(PedidoController, pedidoController);

// usuario
const usuarioRepo = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepo, pedidoService, notificacionService);
const usuarioController = new UsuarioController(usuarioService);

server.setController(UsuarioController, usuarioController);

routes.forEach((route) => server.addRoute(route));
server.configureRoutes();
server.configureErrorHandling();

const startServer = async () => {
    try {
        await connectDB();
        server.launch(() => {
            console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
            console.log(`📚 Documentación Swagger disponible en: http://localhost:${PORT}/api-docs`);
            console.log(`❤️  Health check en: http://localhost:${PORT}/health-check`);
        });
    } catch (error) {
        console.error("Error al iniciar servidor:", error);
    }
};

startServer();

export default app;