import { eq } from 'drizzle-orm';
import { db } from '@/server/db';
import { shotos } from '@/server/schema';

export async function GET(
    _req: Request,
    { params }: { params: { shoto: string } }
) {
    try {
        const shoto = await db
            .select({
                url: shotos.url,
            })
            .from(shotos)
            .where(eq(shotos.name, params.shoto))
            .get();

        if (!shoto) {
            return new Response(
                `Shoto with name: ${params.shoto} does not exists`,
                { status: 404 }
            );
        }

        return new Response(null, {
            status: 307,
            headers: {
                Location: shoto.url,
            },
        });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}
