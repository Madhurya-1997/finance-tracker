import { Env } from "./env.config";

export const corsOptions = {
    origin: Env.FRONTEND_ORIGIN,
    credentials: true
}