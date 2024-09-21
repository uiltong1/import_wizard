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

const connectWithRetry = async (url: string, retries: number = 5): Promise<amqplib.Connection> => {
    while (retries) {
        try {
            const connection = await amqplib.connect(url);
            logger.info('Conexão com RabbitMQ estabelecida com sucesso!');
            return connection;
        } catch (error) {
            logger.error('Erro ao conectar ao RabbitMQ, tentando novamente...', error);
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    throw new Error('Não foi possível conectar ao RabbitMQ após várias tentativas');
};


export const consumeOrders = async () => {
    try {
        const connection = await connectWithRetry(`${process.env.RABBITMQ_URL}`);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: true });
        logger.info('Aguardando pedidos na fila...');

        await channel.consume(queue, async (msg) => {
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
