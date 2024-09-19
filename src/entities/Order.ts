import { Entity, Column, ManyToOne, PrimaryColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { ProductOrder } from './ProductOrder';

@Entity()
export class Order {
    @PrimaryColumn()
    id!: number;

    @ManyToOne(() => User, user => user.orders)
    user!: User;

    @Column({ type: 'date' })
    date!: Date;

    @OneToMany(() => ProductOrder, productOrder => productOrder.order, { cascade: true })
    productOrders!: ProductOrder[];

}