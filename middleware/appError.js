export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(`Producto ${message} no encontrado`, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Solicitud incorrecta') {
    super(message, 400);
  }
}

export class StockError extends AppError {
  constructor(message) {
    super(`Stock insuficiente para ${message}`, 400);
  }
}

export class StatusTransitionError extends AppError {
  constructor(message) {
    super(`Transición de estado inválida: ${message}`, 400);
  }
}