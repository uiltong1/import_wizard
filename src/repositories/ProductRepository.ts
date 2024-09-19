import { AppDataSource } from '../database/dataSource';
import { Product } from '../entities/Product';
import { IProductRepository } from './interfaces/ProductRepositoryInterface';

export class ProductRepository implements IProductRepository {
    private productRepository = AppDataSource.getRepository(Product);

    public async findOneById(productId: number): Promise<Product | null> {
        return await this.productRepository.findOneBy({ id: productId });
    }

    public async createProduct(productData: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(productData);
        return await this.productRepository.save(product);
    }
}
