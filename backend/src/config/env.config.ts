import { getEnv } from "../utils/get-env";

const envConfig = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "8080"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", "mongodb://localhost:27017/finance-tracker-db"),
    JWT_SECRET: getEnv("JWT_SECRET", "test"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d") as string,
    JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", "test"),
    JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "7d") as string,
    GEMINI_API_KEY: getEnv("GEMINI_API_KEY", "test"),
    CRON_SECRET: getEnv("CRON_SECRET", "test"),
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
});

export const Env = envConfig();