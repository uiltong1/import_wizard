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

router.post('/import-orders', upload.single('file'), async (req, res) => {
    try {
        await orderController.importOrders(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar o pedido' });
    }
});

export default router;
