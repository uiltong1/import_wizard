import logger from "../config/logger";
import { AppDataSource } from "../database/dataSource";
import { consumeOrders } from "./orderConsumer";

const startConsumers = async () => {
    try {
        await AppDataSource.initialize();
        await consumeOrders();
        logger.info('Consumidor de pedidos iniciado com sucesso.');
    } catch (error) {
        logger.error('Erro ao iniciar consumidores:', error);
    }
};

startConsumers().catch((error) => {
    logger.error('Erro ao executar a aplicação:', error);
});
