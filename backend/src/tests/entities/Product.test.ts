import { Product } from "../../entities/Product";
import { ProductOrder } from "../../entities/ProductOrder";

describe('Entidade Product', () => {
    it('deve criar um Product com propriedades obrigatórias', () => {
        const product = new Product();
        product.id = 1;
        product.productOrders = [];

        expect(product).toHaveProperty('id', 1);
        expect(product).toHaveProperty('productOrders');
    });

    it('deve permitir múltiplos ProductOrders', () => {
        const product = new Product();
        product.productOrders = [
            new ProductOrder(),
            new ProductOrder(),
        ];

        expect(product.productOrders.length).toBe(2);
    });

    it('deve inicializar com productOrders vazios', () => {
        const product = new Product();
        expect(product.productOrders).toBeUndefined();
    });
});
