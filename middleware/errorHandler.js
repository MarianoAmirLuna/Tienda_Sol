import { ZodError } from "zod";
import { NotFoundError, StockError, StatusTransitionError } from "../middleware/appError.js";
import e from "express";

export const errorHandler = (err, req, res, next) => {

    if (err instanceof ZodError) {

        return res.status(400).json({
            error: 'Validation failed',
            issues: err.issues
        });
    }

    if(err instanceof NotFoundError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if(err instanceof StockError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if(err instanceof StatusTransitionError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
      // cualquier otro error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    return res.status(statusCode).json({
        status: 'error',
        error: message
    });
}