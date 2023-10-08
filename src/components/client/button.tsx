'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(
    'rounded-md px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:text-zinc-400',
    {
        variants: {
            intent: {
                primary:
                    'bg-indigo-500 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-white/10',
                secondary: '',
            },
        },
        defaultVariants: {
            intent: 'primary',
        },
    }
);

type ButtonProps = {
    children: React.ReactNode;
} & VariantProps<typeof buttonStyles> &
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
