import { getEnv } from "../utils/get-env";

const envConfig = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "8080"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", "mongodb://localhost:27017/finance-tracker-db"),
    GEMINI_API_KEY: getEnv("GEMINI_API_KEY", "test"),
    CRON_SECRET: getEnv("CRON_SECRET", "test"),
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
    OAUTH2_GITHUB_CLIENT_ID: getEnv("OAUTH2_GITHUB_CLIENT_ID", "test"),
    OAUTH2_GITHUB_CLIENT_SECRET: getEnv("OAUTH2_GITHUB_CLIENT_SECRET", "test"),
    OAUTH2_GITHUB_REDIRECT_URI: getEnv("OAUTH2_GITHUB_REDIRECT_URI", "test"),
    SESSION_SECRET: getEnv("SESSION_SECRET", "test"),
    COOKIE_SESSION_MAX_AGE: getEnv("COOKIE_SESSION_MAX_AGE", "86400000")
});

export const Env = envConfig();