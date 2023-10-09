'use client';
import {
    ArrowTopRightOnSquareIcon,
    TrashIcon,
} from '@heroicons/react/20/solid';
import IconButton from '@/components/client/icon-button';
import { ShotoSelect } from '@/server/schema';
import { useCallback, useState } from 'react';
import Modal from './modal';

type ShotoItemControlsProps = {
    shoto: ShotoSelect;
    onDelete: (shoto: ShotoSelect) => void | Promise<void>;
    disabled?: boolean;
};

const ShotoItemControls: React.FC<ShotoItemControlsProps> = ({
    shoto,
    onDelete,
    disabled,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleModalClose = useCallback(() => setIsOpen(false), []);
    const handleModalOpen = useCallback(() => setIsOpen(true), []);

    return (
        <>
            <div className="flex items-center gap-x-6">
                <IconButton
                    as="a"
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
                    disabled={disabled}
                />
            </div>
            <Modal
                title="Delete Shoto"
                isOpen={isOpen}
                onClose={handleModalClose}
                onConfirm={() => {
                    onDelete(shoto);
                    setIsOpen(false);
                }}
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
