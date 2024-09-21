import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { PaginatedOrdersDTO } from '../DTO/PaginatedOrdersDTO';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';

@injectable()
export class OrderController {
    constructor(@inject(TYPES.OrderService) private orderService: OrderService
    ) {
    }

    public async getOrders(req: Request, res: Response): Promise<PaginatedOrdersDTO | Response> {
        try {
            const orderId = req.query.orderId ? Number(req.query.orderId) : undefined;
            const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
            const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
            const page = req.query?.page ? Number(req.query?.page) : 1;
            const limit = req.query?.limit ? Number(req.query?.limit) : 10;
            const result = await this.orderService.getOrders({ orderId, startDate, endDate, page, limit });
            return res.json(result)

        } catch (error) {
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
            await this.orderService.importOrders(filePath);
            res.status(200).json({
                message: 'Pedidos adicionados a fila de importação!',
            });
        } catch (error) {
            const message = (error as Error).message || 'Erro desconhecido';
            res.status(500).json({
                message: 'Erro ao tentar adicionar o(s) pedido(s) na fila de importação.',
                error: message,
            });
        }
    }
}
