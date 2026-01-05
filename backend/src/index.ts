import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';

import { Env } from './config/env.config';
import connectDatabase from './config/database.config';

import { errorHandler } from './middlewares/errorHandler.middleware';

import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import transactionRoutes from './routes/transaction.route';
import { checkUserAuthenticated } from './middlewares/checkUserAuthenticated.middleware';
import { cookieSessionConfig } from './config/cookie-session.config';
import { corsOptions } from './config/cors-options.config';
import morgan from 'morgan';
import { morganOptions } from './config/morgan.config';
import logger, { LOGGER_SYMBOLS } from './utils/logger';

const app = express();
const BASE_PATH = Env.BASE_PATH;

// app configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// morgan middleware
app.use(morgan('combined', morganOptions));

// passport & cookie session
app.use(session(cookieSessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, checkUserAuthenticated, userRoutes);
app.use(`${BASE_PATH}/transaction`, checkUserAuthenticated, transactionRoutes);
// open api docs
app.use(
    `${BASE_PATH}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(require('./spec/openapi.json'))
)

// application's error handler
app.use(errorHandler);

// starting the server & connect to mongo server
app.listen(Env.PORT, async () => {
    await connectDatabase();
    logger.info(`${LOGGER_SYMBOLS.INFO} Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});