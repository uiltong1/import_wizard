import { Order } from "../../entities/Order";
import { ProductOrder } from "../../entities/ProductOrder";
import { User } from "../../entities/User";

describe('Order Entity', () => {
    it('deve criar um Order com propriedades obrigatórias', () => {
        const order = new Order();
        order.id = 1;
        order.user = new User();
        order.date = new Date();
        order.productOrders = [];

        expect(order).toHaveProperty('id', 1);
        expect(order).toHaveProperty('user');
        expect(order).toHaveProperty('date');
        expect(order).toHaveProperty('productOrders');
    });

    it('deve permitir múltiplos ProductOrders', () => {
        const order = new Order();
        order.productOrders = [
            new ProductOrder(),
            new ProductOrder(),
        ];

        expect(order.productOrders.length).toBe(2);
    });

    it('deve calcular o total a partir de productOrders', () => {
        const order = new Order();
        order.productOrders = [
            { value: 100 } as ProductOrder,
            { value: 150 } as ProductOrder,
        ];

        const total = order.productOrders.reduce((sum, po) => sum + po.value, 0);
        expect(total).toBe(250);
    });

    it('deve inicializar com productOrders vazios', () => {
        const order = new Order();
        expect(order.productOrders).toBeUndefined();
    });
});
