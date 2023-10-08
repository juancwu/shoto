'use client';
import { twMerge } from 'tailwind-merge';
import buttonStyles from '@/components/styles/button.styles';
import type { ButtonStylesProps } from '@/components/styles/button.styles';

type ButtonProps = {
    children: React.ReactNode;
} & ButtonStylesProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
    children,
    intent,
    className,
    ...props
}) => {
    return (
        <button
            className={twMerge(buttonStyles({ intent }), className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
