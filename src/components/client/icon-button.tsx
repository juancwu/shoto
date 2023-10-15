'use client';
import { twMerge } from 'tailwind-merge';
import { iconButtonStyles } from '../styles/icon-button.styles';

type IconButtonProps = {
    icon: React.ReactNode;
    label: string;
    onClick?: React.MouseEventHandler;
    className?: string;
    disabled?: boolean;
    visibleLabel?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onClick,
    label,
    className,
    disabled,
    visibleLabel = false,
}) => {
    const classes = twMerge(iconButtonStyles({ visibleLabel, className }));

    return (
        <div className="-mx-1.5 -my-1.5">
            <button
                disabled={disabled}
                type="button"
                className={classes}
                onClick={onClick}
            >
                <span className={visibleLabel ? undefined : 'sr-only'}>
                    {label}
                </span>
                {icon}
            </button>
        </div>
    );
};

export default IconButton;
