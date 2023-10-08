'use client';
import { XCircleIcon } from '@heroicons/react/20/solid';

type ErrorAlertProps = {
    title: string;
    errors: string[];
    show: boolean;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({ show, title, errors }) => {
    if (!show) return null;

    return (
        <div className="rounded-md border-2 border-red-400 bg-red-950 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-200">
                        {title}
                    </h3>
                    <div className="mt-2 text-sm text-red-200">
                        <ul role="list" className="list-disc space-y-1 pl-5">
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorAlert;
