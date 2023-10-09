'use client';
import { Dialog, Transition } from '@headlessui/react';
import {
    ArrowTopRightOnSquareIcon,
    TrashIcon,
} from '@heroicons/react/20/solid';
import IconButton from '@/components/client/icon-button';
import { ShotoSelect } from '@/server/schema';
import { Fragment, useState } from 'react';
import Button from './button';

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
                    onClick={() => setIsOpen(true)}
                    disabled={disabled}
                />
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setIsOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40"></div>
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-white"
                                    >
                                        Delete Shoto
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-zinc-400">
                                            Are you sure you want to delete the
                                            shoto with name:{' '}
                                            <span className="font-bold text-white">
                                                {shoto.name}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-6 space-y-6 sm:space-y-0 md:flex md:gap-x-6">
                                        <Button
                                            onClick={() => setIsOpen(false)}
                                            intent="clear"
                                            className="bg-white/5 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-zinc-400"
                                        >
                                            {"No, I don't want to"}
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                onDelete(shoto);
                                                setIsOpen(false);
                                            }}
                                            intent="primary"
                                            className="bg-red-600 text-red-100 transition hover:bg-red-500 focus-visible:bg-red-500 focus-visible:outline-red-500"
                                        >
                                            Yes, delete the shoto
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ShotoItemControls;
