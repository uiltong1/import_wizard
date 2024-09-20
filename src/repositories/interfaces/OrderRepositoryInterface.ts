import { Order } from "../../entities/Order";


export interface OrderRepositoryInterface {

    getOrders(orderId?: number, startDate?: Date, endDate?: Date): Promise<Order[]>;

    findOrderById(orderId: number): Promise<Order | null>;

    saveOrder(order: Order): Promise<Order>;
}
