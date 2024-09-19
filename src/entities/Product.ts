import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Product {
    @PrimaryColumn()
    id!: number;

    @OneToMany(() => Order, order => order.product)
    orders!: Order[]; 
}