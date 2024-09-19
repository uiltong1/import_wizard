import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Order, Product],
});
