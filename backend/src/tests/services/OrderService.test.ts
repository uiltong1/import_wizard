import logger from "../../config/logger";
import { PaginateParamsOrdersDTO } from "../../DTO/PaginateParamsOrdersDTO";
import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { ProductOrder } from "../../entities/ProductOrder";
import { User } from "../../entities/User";
import { sendOrderToQueue } from "../../queues/orderQueue";
import { OrderRepositoryInterface } from "../../repositories/interfaces/OrderRepositoryInterface";
import { OrderService } from "../../services/OrderService";
import { ProductService } from "../../services/ProductService";
import { UserService } from "../../services/UserService";

jest.mock("../../queues/orderQueue", () => ({
    sendOrderToQueue: jest.fn(),
}));


describe('OrderService', () => {
    let orderService: OrderService;
    let orderRepositoryMock: jest.Mocked<OrderRepositoryInterface>;
    let userServiceMock: jest.Mocked<UserService>;
    let productServiceMock: jest.Mocked<ProductService>;

    beforeEach(() => {
        orderRepositoryMock = {
            getOrders: jest.fn(),
            findOrderById: jest.fn(),
            saveOrder: jest.fn(),
        } as unknown as jest.Mocked<OrderRepositoryInterface>;

        userServiceMock = {
            findOrCreateUser: jest.fn(),
        } as unknown as jest.Mocked<UserService>;

        productServiceMock = {
            findOrCreateProduct: jest.fn(),
        } as unknown as jest.Mocked<ProductService>;

        orderService = new OrderService(orderRepositoryMock, userServiceMock, productServiceMock);
    });

    describe('getOrders', () => {
        it('deve retornar pedidos paginados', async () => {
            const mockOrders: Order[] = [
                {
                    id: 1,
                    user: { id: 1, name: 'User 1', orders: [] } as User,
                    date: new Date(),
                    productOrders: [{
                        id: 1,
                        product: { id: 1, productOrders: [] } as Product,
                        value: 10,
                        order: {} as Order,
                    } as ProductOrder],
                },
            ];

            orderRepositoryMock.getOrders.mockResolvedValue({ orders: mockOrders, total: 1 });

            const result = await orderService.getOrders({ page: 1, limit: 10 } as PaginateParamsOrdersDTO);

            expect(result).toEqual({
                users: [{
                    user_id: 1,
                    name: 'User 1',
                    orders: [{
                        order_id: 1,
                        total: '10.00',
                        date: expect.any(String),
                        products: [{ product_id: 1, value: '10' }],
                    }],
                }],
                total: 1,
                page: 1,
                totalPages: 1,
            });
        });
    });

    describe('importOrders', () => {
        it('deve importar pedidos com sucesso', async () => {
            const filePath = 'fake/path.txt';

            (sendOrderToQueue as jest.Mock).mockResolvedValue(0);

            await orderService.importOrders(filePath);

            expect(sendOrderToQueue).toHaveBeenCalledWith(filePath);
        });

        it('deve lançar um erro se a importação falhar', async () => {
            const filePath = 'fake/path.txt';
            const errorMessage = 'Erro ao enviar para a fila';
            (sendOrderToQueue as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(orderService.importOrders(filePath)).rejects.toThrow('Erro ao enviar para a fila');
        });

    });

    describe('processImport', () => {
        it('deve processar linhas do arquivo e criar pedidos', async () => {
            const mockReadFile = jest.spyOn(orderService as any, 'readFile').mockReturnValue([
                "0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308",
            ]);

            jest.spyOn(orderService as any, 'processLine').mockReturnValue({
                userId: 22222,
                customerName: 'John Doe',
                orderId: 1,
                productId: 1,
                productValue: 10,
                date: new Date('2023-01-01'),
            });

            userServiceMock.findOrCreateUser.mockResolvedValue({ id: 1, name: 'John Doe', orders: [] } as User);
            productServiceMock.findOrCreateProduct.mockResolvedValue({ id: 1, productOrders: [] } as Product);
            orderRepositoryMock.saveOrder.mockResolvedValue({ id: 1 } as Order);

            await orderService.processImport('fake/path.txt');

            expect(orderRepositoryMock.saveOrder).toHaveBeenCalled();
        });

        it('deve capturar erros ao processar importações', async () => {
            jest.spyOn(orderService as any, 'readFile').mockReturnValue([
                "invalid line format",
            ]);

            jest.spyOn(orderService as any, 'processLine').mockReturnValue(null);

            await orderService.processImport('fake/path.txt');

            expect(orderRepositoryMock.saveOrder).not.toHaveBeenCalled();
        });
    });
});
