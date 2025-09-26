const {ZodError} = 'zod'


const errorHandler = (err, req, res, next) => {
    console.error(err); // log para debug

    if (err instanceof ZodError) {
        return res.status(400).json(err.issues); // validación de Zod
    }

    res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor'
    });
};

export default errorHandler;