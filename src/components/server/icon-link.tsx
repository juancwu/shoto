import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { iconButtonStyles } from '../styles/icon-button.styles';
import type { IconButtonStylesProps } from '../styles/icon-button.styles';

type IconLinkProps = {
    href: string;
    label: string;
    icon: React.ReactNode;
    visibleLabel?: boolean;
    asNextLink?: boolean;
    className?: string;
} & IconButtonStylesProps;

const IconLink: React.FC<IconLinkProps> = ({
    label,
    icon,
    href,
    className,
    visibleLabel = false,
    asNextLink = true,
}) => {
    if (!asNextLink) {
        return (
            <a
                href={href}
                className={twMerge(
                    iconButtonStyles({ visibleLabel, className })
                )}
            >
                <span className={visibleLabel ? undefined : 'sr-only'}>
                    {label}
                </span>
                {icon}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={twMerge(iconButtonStyles({ visibleLabel, className }))}
        >
            <span className={visibleLabel ? undefined : 'sr-only'}>
                {label}
            </span>
            {icon}
        </Link>
    );
};

export default IconLink;
