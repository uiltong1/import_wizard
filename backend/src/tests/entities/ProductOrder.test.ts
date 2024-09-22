import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { ProductOrder } from "../../entities/ProductOrder";

describe('Entidade ProductOrder', () => {
    it('deve criar um ProductOrder com propriedades obrigatórias', () => {
        const productOrder = new ProductOrder();
        productOrder.id = 1;
        productOrder.product = new Product(); 
        productOrder.order = new Order(); 
        productOrder.value = 99.99;

        expect(productOrder).toHaveProperty('id', 1);
        expect(productOrder).toHaveProperty('value', 99.99);
        expect(productOrder).toHaveProperty('product');
        expect(productOrder).toHaveProperty('order');
    });

    it('deve permitir a associação a um Product', () => {
        const productOrder = new ProductOrder();
        const product = new Product();
        productOrder.product = product;

        expect(productOrder.product).toBe(product);
    });

    it('deve permitir a associação a um Order', () => {
        const productOrder = new ProductOrder();
        const order = new Order();
        productOrder.order = order;

        expect(productOrder.order).toBe(order);
    });
});
