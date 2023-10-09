import { db } from '@/server/db';
import { shotos } from '@/server/schema';
import { auth } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { ZodError, z } from 'zod';

const refValidator = z.string().regex(/[\w_-]{21}/, 'Invalid shoto ref');

export async function DELETE(
    _req: Request,
    { params }: { params: { ref: string } }
) {
    try {
        const user = auth();

        if (!user.userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const ref = await refValidator.parseAsync(params.ref);

        const deletedShotos = await db
            .delete(shotos)
            .where(and(eq(shotos.ref, ref), eq(shotos.owner, user.userId)))
            .returning({ ref: shotos.ref });

        return NextResponse.json({ shotos: deletedShotos }, { status: 200 });
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
