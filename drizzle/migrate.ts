import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const client = createClient({
    url: process.env.DB_URL as string,
    authToken: process.env.DB_AUTH_TOKEN as string,
});

export const db = drizzle(client);

async function main() {
    try {
        await migrate(db, {
            migrationsFolder: 'drizzle/migrations',
        });
        console.log('Tables migrated!');
        process.exit(0);
    } catch (error: any) {
        console.log('Error performing migration: ', error);
        process.exit(1);
    }
}

main();
