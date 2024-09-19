import { Order } from "../../entities/Order";


export interface OrderRepositoryInterface {
    findOrderById(orderId: number): Promise<Order | null>;

    saveOrder(order: Order): Promise<Order>;
}
