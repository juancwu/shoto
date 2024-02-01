import { desc, eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';
import { db } from '@/server/db';
import { shotos as shotosTable } from '@/server/schema';
import ShotoItemControls from '@/components//client/shoto-item-controls';

export default async function ShotoList() {
    const { userId } = auth();
    if (!userId) {
        return <p>{"Looks like you haven't made any shotos."}</p>;
    }

    const shotos = await db
        .select()
        .from(shotosTable)
        .where(eq(shotosTable.owner, userId))
        .orderBy(desc(shotosTable.id))
        .all();

    if (shotos.length < 1) {
        return <p>{"Looks like you haven't made any shotos."}</p>;
    }

    return (
        <ul role="list" className="divide-y divide-white/10">
            {shotos.map((shoto) => (
                <li
                    key={shoto.ref}
                    className="flex items-center justify-between gap-x-6 py-5"
                >
                    <div className="min-w-0">
                        <p className="w-full truncate font-semibold leading-6 text-white">
                            {shoto.name}
                        </p>
                        <a
                            href={shoto.url}
                            className="mt-1 block w-full truncate rounded-sm text-sm leading-5 text-zinc-400 transition hover:text-sky-400 hover:underline focus:outline-none focus-visible:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                        >
                            {shoto.url}
                        </a>
                    </div>
                    <ShotoItemControls shoto={shoto} />
                </li>
            ))}
        </ul>
    );
}
