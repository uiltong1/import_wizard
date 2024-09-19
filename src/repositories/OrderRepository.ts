
import { OrderRepositoryInterface } from './interfaces/OrderRepositoryInterface';
import { Order } from '../entities/Order';
import { AppDataSource } from '../database/dataSource';

export class OrderRepository implements OrderRepositoryInterface {
    private productRepository = AppDataSource.getRepository(Order);

    public async saveOrder(order: Order): Promise<Order> {
        return await this.productRepository.save(order);
    }

}
