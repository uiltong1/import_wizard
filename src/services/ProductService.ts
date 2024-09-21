import { inject, injectable } from 'inversify';
import { Product } from '../entities/Product';
import { ProductRepositoryInterface } from '../repositories/interfaces/ProductRepositoryInterface';
import { TYPES } from '../types/types';

@injectable()
export class ProductService {
    constructor(@inject(TYPES.ProductRepository) private productRepository: ProductRepositoryInterface) {
    }

    public async findOrCreateProduct(productId: number): Promise<Product> {
        let product = await this.productRepository.findOneById(productId);
        if (!product) {
            product = await this.productRepository.createProduct({ id: productId });
        }
        return product;
    }
}
