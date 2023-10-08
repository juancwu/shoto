import { unique, integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { InferSelectModel, InferInsertModel, sql } from 'drizzle-orm';
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
    salt: text('salt').notNull(),
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

export const emails = sqliteTable('emails', {
    id: integer('id', { mode: 'number' })
        .primaryKey({ autoIncrement: true })
        .notNull(),
    ref: text('ref').notNull(),
});

export type EmailInsert = InferInsertModel<typeof emails>;
export type EmailSelect = InferSelectModel<typeof emails>;

export const sessions = sqliteTable('sessions', {
    id: integer('id', { mode: 'number' })
        .primaryKey({ autoIncrement: true })
        .notNull(),
    ref: text('ref').notNull().$defaultFn(nanoid).unique(),
    sessionRef: text('sessionRef')
        .notNull()
        .references(() => users.id),
    createdAt: text('createdAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    expiresAt: integer('expiresAt', { mode: 'number' }).notNull(),
});

export type SessionInsert = InferInsertModel<typeof sessions>;
export type SessionSelect = InferSelectModel<typeof sessions>;
