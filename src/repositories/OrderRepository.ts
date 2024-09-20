import { OrderRepositoryInterface } from './interfaces/OrderRepositoryInterface';
import { Order } from '../entities/Order';
import { AppDataSource } from '../database/dataSource';


export class OrderRepository implements OrderRepositoryInterface {
    private orderRepository = AppDataSource.getRepository(Order);

    public async getOrders(
        orderId?: number,
        startDate?: Date,
        endDate?: Date,
        page: number = 1,
        limit: number = 10
    ): Promise<{ orders: Order[], total: number }> {
        const queryBuilder = this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.productOrders', 'productOrder')
            .leftJoinAndSelect('productOrder.product', 'product');

        if (orderId) {
            queryBuilder.andWhere('order.id = :orderId', { orderId });
        }

        if (startDate) {
            queryBuilder.andWhere('order.date >= :startDate', { startDate });
        }

        if (endDate) {
            queryBuilder.andWhere('order.date <= :endDate', { endDate });
        }

        const [result, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return { orders: result, total };
    }


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
