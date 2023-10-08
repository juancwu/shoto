import { ZodError, z } from 'zod';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/server/db';
import { shotos } from '@/server/schema';

const dataValidator = z.object({
    name: z
        .string({
            required_error: 'Shoto URL for shoto is required',
            invalid_type_error: 'Shoto URL must be a string',
        })
        .min(1, 'Shoto URL must be at least 1 character long')
        .max(255, 'Shoto URL must not exceed 255 characters')
        .trim(),
    url: z
        .string({
            required_error: 'Original URL for shoto is required',
            invalid_type_error: 'Original URL must be a string',
        })
        .min(1, 'Original URL must be at least 1 character long')
        .trim()
        .url('Original URL is invalid'),
});

export async function POST(req: Request) {
    try {
        const user = auth();

        if (!user.userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const data = await req.json();
        const result = await dataValidator.parseAsync(data);
        const shoto = await db
            .select()
            .from(shotos)
            .where(eq(shotos.name, result.name))
            .get();

        if (shoto) {
            return NextResponse.json(
                {
                    errors: [`Shoto with name: ${result.name} already exists.`],
                },
                { status: 400 }
            );
        }

        await db.insert(shotos).values({
            name: result.name.replace(' ', '-'),
            url: result.url,
            owner: user.userId,
        });

        console.log(`User with ID: ${user.userId} created a new shoto!`);

        return new Response('', {
            status: 201,
        });
    } catch (error: any) {
        console.error('Server Error: ', error);
        return NextResponse.json(
            {
                errors:
                    error instanceof ZodError
                        ? error.issues.map((i) => i.message)
                        : [error.message],
            },
            { status: 400 }
        );
    }
}
