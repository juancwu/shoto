import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { db } from '@/server/db';
import { shotos as shotosTable } from '@/server/schema';
import ShotoList from '@/components/client/shoto-list';

export default async function Shotos() {
    const { userId } = auth();
    if (!userId) {
        return (
            <div className="flex items-center justify-center gap-x-4">
                <p>Please sign in to see the Shotos you have created.</p>
                <Link href="/sign-in">Sign In</Link>
            </div>
        );
    }

    const shotos = await db
        .select()
        .from(shotosTable)
        .where(eq(shotosTable.owner, userId))
        .all();

    if (shotos.length < 1) {
        return (
            <p className="mt-4 text-center">
                {"Looks like you haven't made any shotos."}
            </p>
        );
    }

    return <ShotoList data={shotos} />;
}
