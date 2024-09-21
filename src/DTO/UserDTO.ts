import { OrderDTO } from "./OrderDTO";

export interface UserDTO {
    user_id: number;
    name: string;
    orders: OrderDTO[];
}
