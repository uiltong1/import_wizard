import { OrderDTO } from "./OrderDTO";

export class UserDTO {
    user_id: number;
    name: string;
    orders: OrderDTO[];

    constructor(user_id: number, name: string, orders: OrderDTO[]) {
        this.user_id = user_id;
        this.name = name;
        this.orders = orders;
    }
}
