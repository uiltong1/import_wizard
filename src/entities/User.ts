import { Entity,  Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './Order';

@Entity()
export class User {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Order, order => order.user)
    orders!: Order[];
}