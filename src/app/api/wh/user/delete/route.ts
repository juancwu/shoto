import { Webhook } from 'svix';
import { headers as getHeaders } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { shotos } from '@/server/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    if (!process.env.WH_SECRET) {
        throw new Error('Webhook secret missing');
    }

    const headers = getHeaders();
    const svixId = headers.get('svix-id');
    const svixTimestamp = headers.get('svix-timestamp');
    const svixSignature = headers.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response('No svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(process.env.WH_SECRET);

    let whEvent: WebhookEvent;
    try {
        whEvent = wh.verify(body, {
            'svix-id': svixId,
            'svix-signature': svixSignature,
            'svix-timestamp': svixTimestamp,
        }) as WebhookEvent;
    } catch (error: any) {
        console.error('Error verifying webhook: ', error);
        return new Response('Error verifying webhook', { status: 400 });
    }

    const { id } = whEvent.data;
    const eventType = whEvent.type;

    console.log(`WH with ID: ${id} and type of ${eventType}`);
    let deleteCount = 0;
    if (eventType === 'user.deleted' && id) {
        console.log(
            `Proceed to delete all shotos owned by deleted user with ID: ${id}`
        );
        try {
            const deleted = await db
                .delete(shotos)
                .where(eq(shotos.owner, id))
                .returning();
            deleteCount = deleted.length;
        } catch (error: any) {
            console.log('Error deleting shotos', error);
            return new Response('Error deleting shotos owned by deleted user', {
                status: 500,
            });
        }
    }

    console.log(`Deleted ${deleteCount} shotos owned by user with ID: ${id}`);
    return new Response(
        `Deleted ${deleteCount} shotos owned by user with ID: ${id}`,
        { status: 200 }
    );
}
