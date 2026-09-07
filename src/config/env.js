import { config } from 'dotenv';

config();

export const env = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    COOKIE_SECURE: process.env.COOKIE_SECURE === 'true'
};
