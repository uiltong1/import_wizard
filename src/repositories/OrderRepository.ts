import { OrderRepositoryInterface } from './interfaces/OrderRepositoryInterface';
import { Order } from '../entities/Order';
import { AppDataSource } from '../database/dataSource';

export class OrderRepository implements OrderRepositoryInterface {
    private orderRepository = AppDataSource.getRepository(Order);

    public async findOrderById(orderId: number): Promise<Order | null> {
        return await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['productOrders'],
        });
    }

    public async saveOrder(order: Order): Promise<Order> {
        return await this.orderRepository.save(order);
    }

}
