import amqplib from 'amqplib';
import dotenv from 'dotenv';
import logger from '../config/logger';

dotenv.config();

const queue = process.env.RABBITMQ_QUEUE || 'order_queue';

export const sendOrderToQueue = async (message: string) => {
    const connection = await amqplib.connect(`${process.env.RABBITMQ_URL}`);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    logger.info(`Arquivo de pedido(s) adicionado a fila: ${message}`);

    setTimeout(() => {
        channel.close();
        connection.close();
    }, 500);
};