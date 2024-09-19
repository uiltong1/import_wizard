import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
    private orderService: OrderService;

    constructor(orderService: OrderService) {
        this.orderService = orderService;
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
