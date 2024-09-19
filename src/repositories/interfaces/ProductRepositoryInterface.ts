import { Product } from "../../entities/Product";

export interface IProductRepository {
    findOneById(productId: number): Promise<Product | null>;
    createProduct(productData: Partial<Product>): Promise<Product>;
}
