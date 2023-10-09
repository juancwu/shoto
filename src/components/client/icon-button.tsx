'use client';

import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

type IconButtonProps = {
    icon: React.ReactNode;
    label: string;
    onClick?: React.MouseEventHandler;
    className?: string;
    as?: 'a' | 'link' | 'button';
    href?: string;
    disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onClick,
    label,
    className,
    href,
    disabled,
    as = 'button',
}) => {
    if ((as === 'link' || as === 'a') && !href) {
        throw new Error(
            'IconButton component when used as "link" or "a" requires "href" prop to be defined.'
        );
    }

    const classes = twMerge(
        'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
        className
    );

    if (as === 'link' && href) {
        return (
            <div className="-mx-1.5 -my-1.5">
                <Link href={href} className={classes} onClick={onClick}>
                    <span className="sr-only">{label}</span>
                    {icon}
                </Link>
            </div>
        );
    }

    if (as === 'a' && href) {
        return (
            <div className="-mx-1.5 -my-1.5">
                <a href={href} className={classes} onClick={onClick}>
                    <span className="sr-only">{label}</span>
                    {icon}
                </a>
            </div>
        );
    }

    return (
        <div className="-mx-1.5 -my-1.5">
            <button
                disabled={disabled}
                type="button"
                className={classes}
                onClick={onClick}
            >
                <span className="sr-only">{label}</span>
                {icon}
            </button>
        </div>
    );
};

export default IconButton;
