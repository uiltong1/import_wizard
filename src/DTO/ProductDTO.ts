export class ProductDTO {
    product_id: number;
    value: string;

    constructor(product_id: number, value: string) {
        this.product_id = product_id;
        this.value = value;
    }
}
