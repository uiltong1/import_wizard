import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const API_DOCUMENT_URL = process.env.API_DOCUMENT_URL;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Import Wizard API',
            version: '1.0.0',
            description: 'Documentação da API Import Wizard',
        },
        servers: [
            {
                url: API_DOCUMENT_URL,
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
