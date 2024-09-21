import { PaginateParamsOrdersDTO } from "../../DTO/PaginateParamsOrdersDTO";
import { Order } from "../../entities/Order";


export interface OrderRepositoryInterface {

    getOrders(paginateParams: PaginateParamsOrdersDTO): Promise<{ orders: Order[], total: number }>;

    findOrderById(orderId: number): Promise<Order | null>;

    saveOrder(order: Order): Promise<Order>;
}
