import { Product } from "../../entities/Product";

export interface ProductRepositoryInterface {
    findOneById(productId: number): Promise<Product | null>;
    createProduct(productData: Partial<Product>): Promise<Product>;
}
