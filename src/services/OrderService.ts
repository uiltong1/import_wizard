import fs from 'fs';
import { UserService } from './UserService';
import { ProductService } from './ProductService';
import { Order } from '../entities/Order';
import { OrderRepositoryInterface } from '../repositories/interfaces/OrderRepositoryInterface';

export class OrderService {
    private orderRepository: OrderRepositoryInterface;
    private userService: UserService;
    private productService: ProductService;

    constructor(orderRepository: OrderRepositoryInterface, userService: UserService, productService: ProductService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
    }


    public async importOrders(filePath: string): Promise<void> {
        try {
            const lines = this.readFile(filePath);
            const orders: Order[] = [];

            for (const line of lines) {
                const orderData = this.processLine(line);
                if (orderData) {
                    const order = await this.createOrder(orderData);
                    if (order) {
                        orders.push(order);
                    }
                }
            }

            await this.saveOrders(orders);
        } catch (error) {
            console.error('Erro ao importar pedidos:', error);
        }
    }

    private readFile(filePath: string): string[] {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.trim().split('\n');
    }

    private processLine(line: string): { userId: number; customerName: string; orderId: number; productId: number; productValue: string; date: Date } | null {
        const userId = Number(line.substring(0, 10).trim());
        const customerName = line.substring(10, 55).trim();
        const orderId = Number(line.substring(55, 65).trim());
        const productId = Number(line.substring(65, 75).trim());
        const productValue = line.substring(75, 87).trim();
        const dateString = line.substring(87, 95).trim();

        const date = new Date(
            parseInt(dateString.substring(0, 4)),
            parseInt(dateString.substring(4, 6)) - 1,
            parseInt(dateString.substring(6, 8))
        );

        return { userId, customerName, orderId, productId, productValue, date };
    }

    private async createOrder(data: { userId: number; customerName: string; orderId: number; productId: number; productValue: string; date: Date }): Promise<Order | null> {
        const user = await this.userService.findOrCreateUser(data.userId, data.customerName);
        const product = await this.productService.findOrCreateProduct(data.productId);

        const order = new Order();
        order.id = data.orderId;
        order.user = user;
        order.product = product;
        order.value = data.productValue;
        order.date = data.date;

        return order;
    }

    private async saveOrders(orders: Order[]): Promise<void> {
        await Promise.all(orders.map(order => this.orderRepository.saveOrder(order)));
    }
}
