import { Order } from "../../entities/Order";
import { User } from "../../entities/User";

describe('Entidade User', () => {
    it('deve criar um User com propriedades obrigatórias', () => {
        const user = new User();
        user.id = 1;
        user.name = 'John Doe';
        user.orders = [];

        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('name', 'John Doe');
        expect(user).toHaveProperty('orders');
    });

    it('deve permitir múltiplos Orders', () => {
        const user = new User();
        user.orders = [
            new Order(),
            new Order(),
        ];

        expect(user.orders.length).toBe(2);
    });

    it('deve inicializar com orders vazios', () => {
        const user = new User();
        expect(user.orders).toBeUndefined();
    });
});
