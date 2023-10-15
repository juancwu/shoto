'use client';
import { useCallback, useState, useTransition } from 'react';
import {
    ArrowTopRightOnSquareIcon,
    TrashIcon,
} from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/client/icon-button';
import { ShotoSelect } from '@/server/schema';
import Modal from '@/components/client/modal';
import IconLink from '@/components/server/icon-link';

type ShotoItemControlsProps = {
    shoto: ShotoSelect;
};

const ShotoItemControls: React.FC<ShotoItemControlsProps> = ({ shoto }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPending, startTransition] = useTransition();
    const handleModalClose = useCallback(() => setIsModalOpen(false), []);
    const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
    const router = useRouter();
    const isMutating = isDeleting || isPending;

    const deleteShoto = async () => {
        if (isMutating) return;

        try {
            setIsDeleting(true);
            const res = await fetch(`/api/shoto/${shoto.ref}`, {
                method: 'DELETE',
            });
            if (res.status === 200) {
                startTransition(() => {
                    router.refresh();
                });
            } else {
                console.error('Error deleting shoto');
            }
        } catch (error: any) {
            console.error('Error deleting shoto', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-x-6">
                <IconLink
                    href={shoto.url}
                    label={`Visit shoto with name: ${shoto.name}`}
                    icon={
                        <ArrowTopRightOnSquareIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    }
                    className="text-sky-400 transition hover:bg-sky-950 focus:bg-sky-950 focus:ring-sky-400 focus:ring-offset-zinc-900"
                />
                <IconButton
                    label={`Delete shoto with name: ${shoto.name}`}
                    icon={<TrashIcon className="h-5 w-5" aria-hidden="true" />}
                    className="text-red-400 transition hover:bg-red-950 focus:bg-red-950 focus:ring-red-400 focus:ring-offset-red-900"
                    onClick={handleModalOpen}
                    disabled={isMutating}
                />
            </div>
            <Modal
                title="Delete Shoto"
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={deleteShoto}
                confirmText="Yes, delete the shoto"
                cancelText="No, I don't want to"
                intent="danger"
            >
                <p className="text-sm text-zinc-400">
                    Are you sure you want to delete the shoto with name:{' '}
                    <span className="font-bold text-white">{shoto.name}</span>
                </p>
            </Modal>
        </>
    );
};

export default ShotoItemControls;
