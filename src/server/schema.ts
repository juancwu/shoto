import { unique, integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';
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

export const users = sqliteTable('users', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    password: text('password').notNull(),
    ref: text('ref').notNull().$defaultFn(nanoid).unique(),
});

export type UserInsert = InferInsertModel<typeof users>;
export type UserSelect = InferSelectModel<typeof users>;

export const userShotos = sqliteTable(
    'userShotos',
    {
        id: integer('id', { mode: 'number' }).primaryKey({
            autoIncrement: true,
        }),
        userId: integer('userId', { mode: 'number' }).notNull(),
        shotoId: integer('shotoId', { mode: 'number' }).notNull(),
    },
    (t) => ({
        uniqueUserShoto: unique().on(t.userId, t.shotoId),
    })
);

export type UserShotoInsert = InferInsertModel<typeof userShotos>;
export type UserShotoSelect = InferSelectModel<typeof userShotos>;
