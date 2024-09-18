// src/index.ts
import express from 'express';
import { AppDataSource } from './database/dataSource';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(PORT, () => {
            console.log(`Server running in port ${PORT}`);
        });
    })
    .catch((error) => console.log("Database connection error:", error));
