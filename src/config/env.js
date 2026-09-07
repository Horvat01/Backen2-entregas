import { config } from 'dotenv';

config();

export const env = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    NODE_ENV: process.env.NODE_ENV,
    COOKIE_SECURE: process.env.COOKIE_SECURE === 'true'
};