import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/interfaces/ProductRepositoryInterface';

export class ProductService {
    private productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    public async findOrCreateProduct(productId: number): Promise<Product> {
        let product = await this.productRepository.findOneById(productId);
        if (!product) {
            product = await this.productRepository.createProduct({ id: productId });
        }
        return product;
    }
}
