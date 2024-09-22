import "reflect-metadata";

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/dataSource';
import { swaggerUi, swaggerDocs } from './config/swagger';

import orderRoutes from './routes/orderRoutes';
import logger from './config/logger';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', orderRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Server running in port ${PORT}`);
        });
    })
    .catch((error) => logger.error("Database connection error:", error));
