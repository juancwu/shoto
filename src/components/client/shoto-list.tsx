'use client';
import { ShotoSelect } from '@/server/schema';
import ShotoItemControls from '../client/shoto-item-controls';
import { useCallback, useState } from 'react';

type ShotoListProps = {
    data: ShotoSelect[];
};

const ShotoList: React.FC<ShotoListProps> = ({ data }) => {
    const [shotos, setShotos] = useState(data);
    const [deleting, setDeleting] = useState(false);

    const deleteShoto = useCallback(async (shoto: ShotoSelect) => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/shoto/${shoto.ref}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (res.status !== 200) {
                console.error(data.errors);
            } else {
                setShotos((curr) => {
                    const deletedSet = new Set(
                        data.shotos.map((shoto: ShotoSelect) => shoto.ref)
                    );
                    return curr.filter((shoto) => !deletedSet.has(shoto.ref));
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }, []);

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
                    <ShotoItemControls
                        disabled={deleting}
                        shoto={shoto}
                        onDelete={deleteShoto}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ShotoList;
