import { ProductDTO } from "./ProductDTO";

export class OrderDTO {
    order_id: number;
    total: string;
    date: string;
    products: ProductDTO[];

    constructor(order_id: number, total: string, date: string, products: ProductDTO[]) {
        this.order_id = order_id;
        this.total = total;
        this.date = date;
        this.products = products;
    }
}
