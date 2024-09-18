import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, product => product.orders)
    product!: Product;

    @ManyToOne(() => User, user => user.orders)
    user!: User;

    @Column()
    quantity!: number;
}