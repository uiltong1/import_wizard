import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    value!: string;

    @OneToMany(() => Order, order => order.user)
    orders!: Order[];
}