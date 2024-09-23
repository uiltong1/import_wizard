import { injectable } from 'inversify';
import { AppDataSource } from '../config/dataSource';
import { Product } from '../entities/Product';
import { ProductRepositoryInterface } from './interfaces/ProductRepositoryInterface';

@injectable()
export class ProductRepository implements ProductRepositoryInterface {
    private productRepository = AppDataSource.getRepository(Product);

    public async findOneById(productId: number): Promise<Product | null> {
        return await this.productRepository.findOneBy({ id: productId });
    }

    public async createProduct(productData: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(productData);
        return await this.productRepository.save(product);
    }
}
