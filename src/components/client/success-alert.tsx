'use client';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import IconButton from './icon-button';

type SuccessAlertProps = {
    onDimiss: React.MouseEventHandler;
    show: boolean;
    dismissText?: string;
    children?: React.ReactNode;
};

const SuccessAlert: React.FC<SuccessAlertProps> = ({
    show,
    onDimiss,
    dismissText = 'Dismiss',
    children,
}) => {
    if (!show) return null;

    return (
        <div className="rounded-md border-2 border-green-400 bg-green-950 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">{children}</div>
                <div className="ml-auto pl-3">
                    <IconButton
                        icon={
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        }
                        label={dismissText}
                        onClick={onDimiss}
                    />
                </div>
            </div>
        </div>
    );
};

export default SuccessAlert;
