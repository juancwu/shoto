import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const shotos = sqliteTable('shotos', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    url: text('url').notNull(),
    ref: text('ref').notNull().$defaultFn(nanoid).unique(),
});

export type ShotoSelect = InferSelectModel<typeof shotos>;
export type ShotoInsert = InferInsertModel<typeof shotos>;
