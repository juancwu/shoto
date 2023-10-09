'use client';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import {
    Bars3Icon,
    ArrowRightOnRectangleIcon,
    TrashIcon,
} from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';
import { useClerk } from '@clerk/nextjs';
import buttonStyles from '@/components/styles/button.styles';
import { dropDownMenuItemStyles } from '@/components/styles/dropdown-menu.styles';
import Modal from './modal';
import ErrorAlert from './error-alert';
import TextInput from './text-input';

const DropDownMenu: React.FC = () => {
    const { signOut } = useClerk();
    const [isOpen, setIsOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState('');
    const validConfirmDelete = useRef('Delete my account now');

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        className={twMerge(
                            buttonStyles({
                                intent: 'clear',
                            }),
                            'flex items-center justify-center gap-x-2'
                        )}
                    >
                        Menu
                        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded bg-zinc-800 shadow-lg focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => signOut()}
                                        className={twMerge(
                                            dropDownMenuItemStyles({
                                                active,
                                            })
                                        )}
                                    >
                                        <ArrowRightOnRectangleIcon
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        />
                                        Sign Out
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item disabled>
                                <div>
                                    <div className="h-4 border-b border-white/10"></div>
                                    <div className="h-4"></div>
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className={twMerge(
                                            dropDownMenuItemStyles({
                                                active,
                                                danger: true,
                                            })
                                        )}
                                    >
                                        <TrashIcon
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        />
                                        Delete Account
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <Modal
                title="Delete Account"
                isOpen={isOpen}
                confirmText="Delete"
                onClose={() => {
                    setConfirmDelete('');
                    setIsOpen(false);
                }}
                onConfirm={() => console.log('confirm')}
                intent="danger"
                disabledConfirm={confirmDelete !== validConfirmDelete.current}
            >
                <ErrorAlert
                    title="DANGER, STOP!"
                    show={isOpen}
                    errors={[
                        'All data will be erased and can not be recovered once deleted.',
                        'All the shotos you have created will be lost forever.',
                    ]}
                />
                <p className="mt-4" id="delete-confirmation">
                    Enter{' '}
                    <span className="font-bold text-white">
                        {validConfirmDelete.current}
                    </span>{' '}
                    to enable delete button.
                </p>
                <TextInput
                    label="Delete Confirmation"
                    srLabel
                    value={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.value)}
                    name="confirmDelete"
                    aria-describedby="delete-confirmation"
                />
            </Modal>
        </>
    );
};

export default DropDownMenu;
