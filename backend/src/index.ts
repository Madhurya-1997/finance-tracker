import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { Env } from './config/env.config';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { InternalServerException } from './utils/app-error';
import { asyncHandler } from './middlewares/asyncHandler.middleware';
import connectDatabase from './config/database.config';

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true
}));

app.get("/", asyncHandler(async (req, res) => {
    throw new InternalServerException("Something went wrong");
    res.send("Hello world")
}));

app.use(errorHandler);

app.listen(Env.PORT, async () => {
    await connectDatabase();
    console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});