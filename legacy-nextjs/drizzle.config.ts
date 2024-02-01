import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const config: Config = {
    schema: './src/server/schema.ts',
    driver: 'turso',
    dbCredentials: {
        url: process.env.DB_URL as string,
        authToken: process.env.DB_AUTH_TOKEN as string,
    },
    verbose: true,
    strict: true,
    out: './drizzle/migrations',
};

export default config;
