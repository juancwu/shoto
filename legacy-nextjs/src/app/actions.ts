'use server';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';
import { db } from '@/server/db';
import { shotos } from '@/server/schema';
import { revalidatePath } from 'next/cache';

const dataValidator = z.object({
    shoto: z
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

export async function createShoto(formData: FormData) {
    try {
        const user = auth();

        if (!user.userId) {
            console.error(
                'Unauthorized access to createShoto action attempted.'
            );
            return;
        }

        const result = await dataValidator.parseAsync({
            shoto: formData.get('shoto'),
            url: formData.get('url'),
        });
        const shoto = await db
            .select()
            .from(shotos)
            .where(eq(shotos.name, result.shoto))
            .get();

        if (shoto) {
            console.error(`Shoto with name: ${result.shoto} already exists.`);
            return;
        }

        await db.insert(shotos).values({
            name: result.shoto.replace(' ', '-'),
            url: result.url,
            owner: user.userId,
        });

        console.log(`User with ID: ${user.userId} created a new shoto!`);

        revalidatePath('/');
    } catch (error: any) {
        console.error('Server Error: ', error);
    }
}
