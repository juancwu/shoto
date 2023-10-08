'use client';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

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
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            className="inline-flex rounded-md bg-green-400 p-1.5 text-green-900 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-950"
                            onClick={onDimiss}
                        >
                            <span className="sr-only">{dismissText}</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessAlert;
