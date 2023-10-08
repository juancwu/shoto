import { ZodError, z } from 'zod';
import { db } from '@/server/db';
import { shotos } from '@/server/schema';
import { eq } from 'drizzle-orm';

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
        const data = await req.json();
        const result = await dataValidator.parseAsync(data);
        const shoto = await db
            .select()
            .from(shotos)
            .where(eq(shotos.name, result.name))
            .get();

        if (shoto) {
            return new Response(
                `Shoto with name: ${result.name} already exists.`,
                { status: 400 }
            );
        }

        await db.insert(shotos).values({
            name: result.name.replace(' ', '-'),
            url: result.url,
        });
        console.log('save new shoto');
        return new Response('Saved!', {
            status: 201,
        });
    } catch (error: any) {
        console.log('server error', error);
        return new Response(
            error instanceof ZodError
                ? error.issues.map((i) => i.message).join('\n')
                : error.message,
            {
                status: error instanceof ZodError ? 400 : 500,
            }
        );
    }
}
