import express from 'express';
import { AppDataSource } from './database/dataSource';
import { swaggerUi, swaggerDocs } from './config/swagger'; 

import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', orderRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(PORT, () => {
            console.log(`Server running in port ${PORT}`);
        });
    })
    .catch((error) => console.log("Database connection error:", error));
