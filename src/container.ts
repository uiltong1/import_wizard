import { Container } from "inversify";
import { OrderController } from "./controllers/OrderController";
import { OrderRepository } from "./repositories/OrderRepository";
import { ProductRepository } from "./repositories/ProductRepository";
import { UserRepository } from "./repositories/UserRepository";
import { OrderService } from "./services/OrderService";
import { ProductService } from "./services/ProductService";
import { UserService } from "./services/UserService";
import { TYPES } from "./types/types";

const container = new Container();

// REPOSITORIES
container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepository);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepository);

// SERVICES
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<ProductService>(TYPES.ProductService).to(ProductService);
container.bind<OrderService>(TYPES.OrderService).to(OrderService);
container.bind<OrderController>(TYPES.OrderController).to(OrderController);

export { container };
