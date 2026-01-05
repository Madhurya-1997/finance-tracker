import mongoose from 'mongoose';
import { Env } from './env.config';
import logger, { LOGGER_SYMBOLS } from '../utils/logger';

const connectDatabase = async () => {
    try {
        await mongoose.connect(Env.MONGO_URI, {
            serverSelectionTimeoutMS: 8000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000
        });
        logger.info(`${LOGGER_SYMBOLS.INFO} MongoDB connected successfully`);

        console.log(``);
    } catch (error) {
        logger.error(`${LOGGER_SYMBOLS.ERROR} Error connecting to MongoDB ::: ${error}`);
        process.exit(1);
    }
}

export default connectDatabase;