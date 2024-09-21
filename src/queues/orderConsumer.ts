import "reflect-metadata";
import amqplib from 'amqplib';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { OrderService } from '../services/OrderService';
import { container } from '../container';
import { TYPES } from '../types/types';
import logger from "../config/logger";

dotenv.config();

const queue = process.env.RABBITMQ_QUEUE || 'order_queue';

export const consumeOrders = async () => {
    try {
        const connection = await amqplib.connect(`${process.env.RABBITMQ_URL}`);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: true });
        logger.info('Aguardando pedidos na fila...');

        channel.consume(queue, async (msg) => {
            if (msg) {
                const filePath = msg.content.toString();
                const orderService = container.get<OrderService>(TYPES.OrderService);

                try {
                    await orderService.processImport(filePath);
                    logger.info(`Arquivo processado: ${filePath}`);
                    await fs.unlink(filePath);
                    channel.ack(msg);
                } catch (error) {
                    logger.error(`Erro ao processar o arquivo: ${filePath}`, error);
                    channel.nack(msg);
                }
            }
        }, { noAck: false });

    } catch (error) {
        logger.error('Erro ao conectar ao RabbitMQ', error);
    }
};
