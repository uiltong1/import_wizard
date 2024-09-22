import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class ProductOrder {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, product => product.productOrders)
    product!: Product;

    @ManyToOne(() => Order, order => order.productOrders)
    order!: Order;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    value!: number;
}
