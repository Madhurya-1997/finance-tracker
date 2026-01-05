import { Env } from "./env.config";

export const cookieSessionConfig = {
    secret: Env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'finance-tracker-session',
    cookie: {
        maxAge: Number(Env.COOKIE_SESSION_MAX_AGE), // 1 week
    }
}