import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { UserDTO } from '../DTO/UserDTO';

export class OrderController {
    private orderService: OrderService;

    constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    public async getOrders(req: Request, res: Response): Promise<Response> {
        try {
            const orderId = req.query.orderId ? Number(req.query.orderId) : undefined;
            const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
            const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

            const orders: UserDTO[] = await this.orderService.getOrders(orderId, startDate, endDate);
            return res.json(orders);
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            return res.status(500).json({ error: 'Erro ao obter pedidos' });
        }
    }


    public async importOrders(req: Request, res: Response): Promise<void> {
        if (!req.file) {
            res.status(400).json({ message: 'Arquivo não fornecido' });
            return;
        }

        const filePath = req.file.path;

        try {
            const importedCount = await this.orderService.importOrders(filePath);
            res.status(201).json({
                message: 'Pedidos importados com sucesso!',
                count: importedCount,
            });
        } catch (error) {
            const message = (error as Error).message || 'Erro desconhecido';
            res.status(500).json({
                message: 'Erro ao importar pedidos',
                error: message,
            });
        }
    }
}
