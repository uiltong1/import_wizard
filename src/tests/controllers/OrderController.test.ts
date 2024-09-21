import { Request, Response } from 'express';
import { OrderController } from '../../controllers/OrderController';
import { OrderService } from '../../services/OrderService';
import { PaginatedOrdersDTO } from '../../DTO/PaginatedOrdersDTO';

describe('OrderController', () => {
    let orderController: OrderController;
    let orderServiceMock: jest.Mocked<OrderService>;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        orderServiceMock = {
            getOrders: jest.fn(),
            importOrders: jest.fn(),
        } as unknown as jest.Mocked<OrderService>;

        orderController = new OrderController(orderServiceMock);

        req = {
            query: {},
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('getOrders', () => {
        it('deve retornar pedidos com sucesso', async () => {
            const mockResult: PaginatedOrdersDTO = {
                users: [],
                total: 0,
                page: 1,
                totalPages: 1,
            };

            orderServiceMock.getOrders.mockResolvedValue(mockResult);

            req.query = {
                orderId: '1',
                startDate: '2023-01-01',
                endDate: '2023-12-31',
                page: '1',
                limit: '10',
            };

            await orderController.getOrders(req as Request, res as Response);

            expect(orderServiceMock.getOrders).toHaveBeenCalledWith({
                orderId: 1,
                startDate: new Date('2023-01-01'),
                endDate: new Date('2023-12-31'),
                page: 1,
                limit: 10,
            });
            expect(res.json).toHaveBeenCalledWith(mockResult);
        });

        it('deve retornar erro 500 em caso de exceção', async () => {
            orderServiceMock.getOrders.mockRejectedValue(new Error('Erro ao obter pedidos'));

            await orderController.getOrders(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter pedidos' });
        });
    });

    describe('importOrders', () => {
        it('deve retornar erro 400 se o arquivo não for fornecido', async () => {
            await orderController.importOrders(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Arquivo não fornecido' });
        });

        it('deve importar pedidos com sucesso', async () => {
            req.file = {
                path: 'fake/path.txt',
            } as any;

            orderServiceMock.importOrders.mockResolvedValue();

            await orderController.importOrders(req as Request, res as Response);

            expect(orderServiceMock.importOrders).toHaveBeenCalledWith('fake/path.txt');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Pedidos adicionados à fila de importação!',
            });
        });

        it('deve retornar erro 500 em caso de exceção durante a importação', async () => {
            req.file = {
                path: 'fake/path.txt',
            } as any;

            orderServiceMock.importOrders.mockRejectedValue(new Error('Erro ao importar pedidos'));

            await orderController.importOrders(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Erro ao tentar adicionar o(s) pedido(s) na fila de importação.',
                error: 'Erro ao importar pedidos',
            });
        });
    });
});
