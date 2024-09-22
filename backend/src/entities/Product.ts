import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductOrder } from './ProductOrder';

@Entity()
export class Product {
    @PrimaryColumn()
    id!: number;

    @OneToMany(() => ProductOrder, productOrder => productOrder.product)
    productOrders!: ProductOrder[];
}