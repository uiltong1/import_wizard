import { Product } from "../../entities/Product";
import { ProductRepositoryInterface } from "../../repositories/interfaces/ProductRepositoryInterface";
import { ProductService } from "../../services/ProductService";

describe('ProductService', () => {
    let productService: ProductService;
    let productRepositoryMock: jest.Mocked<ProductRepositoryInterface>;

    beforeEach(() => {
        productRepositoryMock = {
            findOneById: jest.fn(),
            createProduct: jest.fn(),
        } as unknown as jest.Mocked<ProductRepositoryInterface>;

        productService = new ProductService(productRepositoryMock);
    });

    describe('findOrCreateProduct', () => {
        it('deve retornar um produto existente', async () => {
            const mockProduct: Product = { id: 1, productOrders: [] }; // Simule o novo produto
            productRepositoryMock.findOneById.mockResolvedValue(mockProduct);

            const result = await productService.findOrCreateProduct(1);

            expect(result).toEqual(mockProduct);
            expect(productRepositoryMock.findOneById).toHaveBeenCalledWith(1);
            expect(productRepositoryMock.createProduct).not.toHaveBeenCalled();
        });

        it('deve criar um novo produto se não existir', async () => {
            productRepositoryMock.findOneById.mockResolvedValue(null); 
            const newProduct: Product = { id: 1, productOrders: [] };
            productRepositoryMock.createProduct.mockResolvedValue(newProduct);

            const result = await productService.findOrCreateProduct(1);

            expect(result).toEqual(newProduct);
            expect(productRepositoryMock.findOneById).toHaveBeenCalledWith(1);
            expect(productRepositoryMock.createProduct).toHaveBeenCalledWith({ id: 1 });
        });
    });
});
