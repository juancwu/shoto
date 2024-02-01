'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from './button';
import type { ButtonStylesProps } from '../styles/button.styles';

type ShotoItemControlsProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    disabledConfirm?: boolean;
} & Pick<ButtonStylesProps, 'intent'>;

const Modal: React.FC<ShotoItemControlsProps> = ({
    title,
    isOpen,
    onClose,
    onConfirm,
    children,
    disabledConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    intent = 'primary',
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2">{children}</div>
                                <div className="mt-6 space-y-6 sm:space-y-0 md:flex md:gap-x-6">
                                    <Button
                                        onClick={onClose}
                                        intent="clear"
                                        className="bg-white/5 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-zinc-400"
                                    >
                                        {cancelText}
                                    </Button>
                                    <Button
                                        disabled={disabledConfirm}
                                        onClick={onConfirm}
                                        intent={intent}
                                    >
                                        {confirmText}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
