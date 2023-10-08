import crypto from 'crypto';
import { parse, serialize } from 'cookie';

export const SESSION_COOKIE_MAX_AGE = 28800; // 8 hours

export function signCookie(value: string, salt: string) {
    return (
        value +
        '.' +
        crypto
            .createHmac('sha256', (salt + process.env.COOKIE_SECRET) as string)
            .update(value)
            .digest('base64')
            .replace(/\=+$/, '')
    );
}

export function unsignCookie(value: string, salt: string) {
    const sussyValue = value.slice(0, value.lastIndexOf('.'));
    const expectedValue = signCookie(sussyValue, salt);
    const expectedBuffer = Buffer.from(expectedValue);
    const valueBuffer = Buffer.from(value);

    return expectedBuffer.length === valueBuffer.length &&
        crypto.timingSafeEqual(expectedBuffer, valueBuffer)
        ? sussyValue
        : false;
}

export function getSessionCookie(payload: string, salt: string) {
    const signedValue = signCookie(payload, salt);
    const cookie = serialize('session', signedValue, {
        maxAge: SESSION_COOKIE_MAX_AGE,
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: '/',
        priority: 'high',
    });

    return cookie;
}

export function parseCookies(cookies: string, salt: string) {
    const parsed = parse(cookies);
    // unsigned them cookies
    const cookieKeys = Object.keys(parsed);
    cookieKeys.forEach((key) => {
        const value = unsignCookie(parsed[key], salt);
        if (value === false) {
            throw Error('Invalid cookie signature!');
        }

        parsed[key] = value;
    });

    return parsed;
}
