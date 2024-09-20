import { Order } from "../../entities/Order";


export interface OrderRepositoryInterface {

    getOrders(orderId?: number, startDate?: Date, endDate?: Date, page?: number, limit?: number): Promise<{ orders: Order[], total: number }>;

    findOrderById(orderId: number): Promise<Order | null>;

    saveOrder(order: Order): Promise<Order>;
}
