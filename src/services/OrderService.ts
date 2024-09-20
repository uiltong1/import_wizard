import fs from 'fs';
import { UserService } from './UserService';
import { ProductService } from './ProductService';
import { Order } from '../entities/Order';
import { OrderRepositoryInterface } from '../repositories/interfaces/OrderRepositoryInterface';
import { ProductOrder } from '../entities/ProductOrder';
import { UserDTO } from '../DTO/UserDTO';

export class OrderService {
    private orderRepository: OrderRepositoryInterface;
    private userService: UserService;
    private productService: ProductService;

    constructor(orderRepository: OrderRepositoryInterface, userService: UserService, productService: ProductService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
    }

    public async getOrders(orderId?: number, startDate?: Date, endDate?: Date, page: number = 1, limit: number = 10): Promise<UserDTO[]> {
        const { orders, total } = await this.orderRepository.getOrders(orderId, startDate, endDate, page, limit);
        const userMap = new Map<number, UserDTO>();

        for (const order of orders) {
            const total = order.productOrders.reduce((sum, po) => sum + po.value, 0).toFixed(2);

            if (!userMap.has(order.user.id)) {
                userMap.set(order.user.id, {
                    user_id: order.user.id,
                    name: order.user.name,
                    orders: [],
                });
            }

            userMap.get(order.user.id)?.orders.push({
                order_id: order.id,
                total,
                date: order.date instanceof Date ? order.date.toISOString().split('T')[0] : new Date(order.date).toISOString().split('T')[0],
                products: order.productOrders.map(po => ({
                    product_id: po.product.id,
                    value: po.value.toString(),
                })),
            });
        }

        return Array.from(userMap.values());

    }


    public async importOrders(filePath: string): Promise<void> {
        try {
            const lines = this.readFile(filePath);

            for (const line of lines) {
                const orderData = this.processLine(line);
                if (orderData) {
                    await this.createOrder(orderData);
                }
            }

        } catch (error) {
            console.error('Erro ao importar pedidos:', error);
        }
    }

    private readFile(filePath: string): string[] {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.trim().split('\n');
    }

    private processLine(line: string): { userId: number; customerName: string; orderId: number; productId: number; productValue: number; date: Date } | null {
        const userId = Number(line.substring(0, 10).trim());
        const customerName = line.substring(10, 55).trim();
        const orderId = Number(line.substring(55, 65).trim());
        const productId = Number(line.substring(65, 75).trim());
        const productValue = parseFloat(line.substring(75, 87).trim());
        const dateString = line.substring(87, 95).trim();

        const date = new Date(
            parseInt(dateString.substring(0, 4)),
            parseInt(dateString.substring(4, 6)) - 1,
            parseInt(dateString.substring(6, 8))
        );

        return { userId, customerName, orderId, productId, productValue, date };
    }

    private async createOrder(data:
        { userId: number; customerName: string; orderId: number; productId: number; productValue: number; date: Date }): Promise<Order | null> {
        const user = await this.userService.findOrCreateUser(data.userId, data.customerName);
        const product = await this.productService.findOrCreateProduct(data.productId);

        let order = await this.orderRepository.findOrderById(data.orderId);

        if (!order) {
            order = new Order();
            order.id = data.orderId;
            order.user = user;
            order.date = data.date;
            order.productOrders = [];
        }

        const productOrder = new ProductOrder();
        productOrder.product = product;
        productOrder.value = data.productValue;
        productOrder.order = order;
        order.productOrders.push(productOrder);

        return await this.orderRepository.saveOrder(order);
    }
}
