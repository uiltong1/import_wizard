import { Order } from "../../entities/Order";


export interface OrderRepositoryInterface {
    saveOrder(order: Order): Promise<Order>;
}
