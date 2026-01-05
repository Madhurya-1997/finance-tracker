import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Good for production/cloud tools
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Create a stream object that Morgan can use
export const loggerStream = {
    write: (message: string) => logger.info(message.trim())
};

export const LOGGER_SYMBOLS = {
    INFO: 'ℹ️',
    ERROR: '❌',
    WARN: '⚠️'
}


export default logger;