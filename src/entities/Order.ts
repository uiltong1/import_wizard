import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Order {
    @PrimaryColumn()
    id!: number;

    @Column()
    value!: string;

    @ManyToOne(() => Product, product => product.orders)
    product!: Product;

    @ManyToOne(() => User, user => user.orders)
    user!: User;

    @Column({ type: 'date' })
    date!: Date;
}