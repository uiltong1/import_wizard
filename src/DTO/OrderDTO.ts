import { ProductDTO } from "./ProductDTO";

export interface OrderDTO {
    order_id: number;
    total: string;
    date: string;
    products: ProductDTO[];
}
