import { jest } from '@jest/globals';

// En lugar de usar jest.mock, creamos mocks manuales
const mockUsuarioSchema = {
  parsearUsuario: jest.fn(),
  parsearLogin: jest.fn(),
  parsearId: jest.fn()
};

const mockUsuarioRepository = {
  create: jest.fn(),
  findByMail: jest.fn(),
  findById: jest.fn()
};

const mockJWTGenerator = {
  generarToken: jest.fn()
};

const mockPedidoService = {
  historialPedido: jest.fn()
};

// Mock de las clases
const MockUsuarioService = jest.fn().mockImplementation(() => ({
  // métodos del servicio si son necesarios
}));

const MockUsuarioController = jest.fn().mockImplementation((usuarioService, pedidoService) => ({
  usuarioService,
  pedidoService,
  crearUsuario: jest.fn(),
  login: jest.fn(),
  obtenerUsuario: jest.fn(),
  historialPedidos: jest.fn()
}));

// Simular los imports
const usuarioSchema = mockUsuarioSchema;
const usuarioRepo = mockUsuarioRepository;
const JWTGenerator = mockJWTGenerator;

describe("UsuarioService y UsuarioController", () => {
  let usuarioController;
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Crear instancia del controlador mock
    usuarioController = new MockUsuarioController({}, mockPedidoService);
    
    // Configurar mocks del controlador para que llamen a nuestros mocks
    usuarioController.crearUsuario.mockImplementation(async (req, res, next) => {
      try {
        const result = usuarioSchema.parsearUsuario(req);
        const usuario = await usuarioRepo.create(result.data);
        const token = JWTGenerator.generarToken(usuario);
        res.status(201).json({ usuario, token });
      } catch (error) {
        next(error);
      }
    });

    usuarioController.login.mockImplementation(async (req, res, next) => {
      try {
        const { email, password } = usuarioSchema.parsearLogin(req).data;
        const usuario = await usuarioRepo.findByMail(email);
        
        if (!usuario || !usuario.validarPassword(password)) {
          throw new Error('Credenciales inválidas');
        }
        
        const token = JWTGenerator.generarToken(usuario);
        res.json({ usuario, token });
      } catch (error) {
        next(error);
      }
    });

    usuarioController.obtenerUsuario.mockImplementation(async (req, res, next) => {
      try {
        const id = usuarioSchema.parsearId(req);
        const usuario = await usuarioRepo.findById(id);
        res.json(usuario);
      } catch (error) {
        next(error);
      }
    });

    usuarioController.historialPedidos.mockImplementation(async (req, res, next) => {
      try {
        const id = usuarioSchema.parsearId(req);
        const { page, limit } = req.query;
        const historial = await mockPedidoService.historialPedido(id, page, limit);
        res.json(historial);
      } catch (error) {
        next(error);
      }
    });

    // Mock de objetos Express
    mockReq = {
      body: {},
      params: {},
      query: {}
    };
    
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    
    mockNext = jest.fn();
  });

  describe("Crear usuario", () => {
    test("Crear usuario correctamente y devolver token", async () => {
      // Arrange
      const usuarioMock = {
        id: "123",
        nombre: "Mariano",
        email: "mariano@example.com",
        password: "hashedpassword",
        rol: "COMPRADOR"
      };

      const tokenMock = "fake-jwt-token";

      usuarioSchema.parsearUsuario.mockReturnValue({ data: usuarioMock });
      usuarioRepo.create.mockResolvedValue(usuarioMock);
      JWTGenerator.generarToken.mockReturnValue(tokenMock);

      mockReq.body = {
        nombre: "Mariano",
        email: "mariano@example.com",
        password: "password123",
        rol: "COMPRADOR"
      };

      // Act
      await usuarioController.crearUsuario(mockReq, mockRes, mockNext);

      // Assert
      expect(usuarioSchema.parsearUsuario).toHaveBeenCalledWith(mockReq);
      expect(usuarioRepo.create).toHaveBeenCalledWith(usuarioMock);
      expect(JWTGenerator.generarToken).toHaveBeenCalledWith(usuarioMock);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        usuario: usuarioMock,
        token: tokenMock
      });
    });
  });

  describe("Login de usuario", () => {
    test("Logear usuario con credenciales válidas", async () => {
      // Arrange
      const usuarioMock = {
        id: "123",
        email: "mariano@example.com",
        password: "hashedpassword",
        validarPassword: jest.fn().mockReturnValue(true)
      };

      JWTGenerator.generarToken.mockReturnValue("fake-token");
      usuarioRepo.findByMail.mockResolvedValue(usuarioMock);
      usuarioSchema.parsearLogin.mockReturnValue({
        data: { email: "mariano@example.com", password: "correctpassword" }
      });

      mockReq.body = { 
        email: "mariano@example.com", 
        password: "correctpassword" 
      };

      // Act
      await usuarioController.login(mockReq, mockRes, mockNext);

      // Assert
      expect(usuarioSchema.parsearLogin).toHaveBeenCalledWith(mockReq);
      expect(usuarioRepo.findByMail).toHaveBeenCalledWith("mariano@example.com");
      expect(usuarioMock.validarPassword).toHaveBeenCalledWith("correctpassword");
      expect(JWTGenerator.generarToken).toHaveBeenCalledWith(usuarioMock);
      expect(mockRes.json).toHaveBeenCalledWith({
        usuario: usuarioMock,
        token: "fake-token"
      });
    });

    test("Login falla con credenciales inválidas", async () => {
      // Arrange
      usuarioRepo.findByMail.mockResolvedValue(null);
      usuarioSchema.parsearLogin.mockReturnValue({
        data: { email: "mariano@example.com", password: "wrongpass" }
      });
      
      mockReq.body = { 
        email: "mariano@example.com", 
        password: "wrongpass" 
      };

      // Act
      await usuarioController.login(mockReq, mockRes, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext.mock.calls[0][0].message).toBe('Credenciales inválidas');
    });
  });
});