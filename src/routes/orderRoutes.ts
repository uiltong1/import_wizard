import { Router } from 'express';
import multer from 'multer';
import { OrderController } from '../controllers/OrderController';
import { OrderService } from '../services/OrderService';
import { UserService } from '../services/UserService';
import { ProductService } from '../services/ProductService';
import { UserRepository } from '../repositories/UserRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { OrderRepository } from '../repositories/OrderRepository';

const router = Router();
const upload = multer({ dest: 'uploads/' });

const orderRepository = new OrderRepository();
const userRepository = new UserRepository();
const productRepository = new ProductRepository();

const userService = new UserService(userRepository);
const productService = new ProductService(productRepository);
const orderService = new OrderService(orderRepository, userService, productService);

const orderController = new OrderController(orderService);

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Operações relacionadas a pedidos
 *
 * /api/orders:
 *   get:
 *     summary: Retorna a lista de pedidos
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: orderId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do pedido para filtrar a lista
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início para filtrar os pedidos
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim para filtrar os pedidos
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de resultados por página
 *     responses:
 *       200:
 *         description: Lista de pedidos cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: integer
 *                         example: 123
 *                       total:
 *                         type: string
 *                         example: "1024.48"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2021-12-01"
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product_id:
 *                               type: integer
 *                               example: 111
 *                             value:
 *                               type: string
 *                               example: "512.24"
 *                 total:
 *                   type: integer
 *                   description: Número total de pedidos
 *       500:
 *         description: Erro ao obter pedidos
 */
router.get('/orders', (req, res) => orderController.getOrders(req, res));


/**
 * @swagger
 * /api/import-orders:
 *   post:
 *     summary: Importa pedidos a partir de um arquivo txt
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: O arquivo contendo os pedidos a serem importados.
 *     responses:
 *       200:
 *         description: Pedidos importados com sucesso
 *       500:
 *         description: Erro ao processar o pedido
 */
router.post('/import-orders', upload.single('file'), async (req, res) => {
    try {
        await orderController.importOrders(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar o pedido' });
    }
});

export default router;
