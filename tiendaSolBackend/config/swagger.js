import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Backend Grupo 09 - E-commerce',
            version: '1.0.0',
            description: 'Documentación completa de la API para el sistema de e-commerce TiendaSol',
            contact: {
                name: 'Equipo Grupo 09',
                email: 'grupo09@email.com',
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.SERVER_PORT || 8000}`,
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011'
                        },
                        nombre: {
                            type: 'string',
                            example: 'Juan Pérez'
                        },
                        email: {
                            type: 'string',
                            example: 'juan@email.com'
                        }
                    }
                },
                Producto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439012'
                        },
                        nombre: {
                            type: 'string',
                            example: 'Laptop Gaming'
                        },
                        descripcion: {
                            type: 'string',
                            example: 'Laptop para gaming de alta gama'
                        },
                        precio: {
                            type: 'number',
                            format: 'float',
                            example: 1299.99
                        },
                        stock: {
                            type: 'integer',
                            example: 15
                        },
                        categoria: {
                            type: 'string',
                            example: 'Tecnología'
                        },
                        vendedorId: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439013'
                        }
                    }
                },
                Pedido: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439014'
                        },
                        usuarioId: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011'
                        },
                        estado: {
                            type: 'string',
                            enum: ['PENDIENTE', 'CONFIRMADO', 'EN_CAMINO', 'ENTREGADO', 'CANCELADO'],
                            example: 'PENDIENTE'
                        },
                        total: {
                            type: 'number',
                            format: 'float',
                            example: 2599.98
                        },
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    productoId: { type: 'string' },
                                    cantidad: { type: 'integer' },
                                    precio: { type: 'number' }
                                }
                            }
                        }
                    }
                },
                Notificacion: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439015'
                        },
                        mensaje: {
                            type: 'string',
                            example: 'Tu pedido ha sido confirmado'
                        },
                        leida: {
                            type: 'boolean',
                            example: false
                        },
                        fecha: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            example: 'Recurso no encontrado'
                        },
                        codigo: {
                            type: 'integer',
                            example: 404
                        },
                        mensaje: {
                            type: 'string',
                            example: 'El recurso solicitado no existe'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;