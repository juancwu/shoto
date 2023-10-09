import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const shotos = sqliteTable('shotos', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    url: text('url').notNull(),
    ref: text('ref').notNull().$defaultFn(nanoid).unique(),
    owner: text('owner').notNull(),
});

export type ShotoSelect = InferSelectModel<typeof shotos>;
export type ShotoInsert = InferInsertModel<typeof shotos>;

export const emails = sqliteTable('emails', {
    id: integer('id', { mode: 'number' })
        .primaryKey({ autoIncrement: true })
        .notNull(),
    ref: text('ref').notNull(),
});

export type EmailInsert = InferInsertModel<typeof emails>;
export type EmailSelect = InferSelectModel<typeof emails>;
