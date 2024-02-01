import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '@/server/schema';

export const client = createClient({
    url: process.env.DB_URL as string,
    authToken: process.env.DB_AUTH_TOKEN as string,
});

export const db = drizzle(client, { schema, logger: true });
