import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { Product } from "../models/Product";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Order, Product],
});
