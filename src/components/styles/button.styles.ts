import { VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(
    'rounded-md px-3 py-2 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:opacity-50',
    {
        variants: {
            intent: {
                primary:
                    'bg-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:bg-indigo-500 disabled:bg-white/10',
                secondary:
                    'border-2 border-indigo-600 bg-indigo-950 text-indigo-400 opacity-75 enabled:hover:opacity-100 enabled:focus-visible:opacity-100 disabled:border-white/10 disabled:bg-zinc-900',
                clear: 'hover:text-indigo-400 focus-visible:text-indigo-400',
                danger: 'bg-red-500 text-red-100 hover:bg-red-400 focus-visible:bg-red-400 focus-visible:outline-red-400',
            },
        },
        defaultVariants: {
            intent: 'primary',
        },
    }
);

export type ButtonStylesProps = VariantProps<typeof buttonStyles>;

export default buttonStyles;

export function getButtonStyles(props: ButtonStylesProps, className = '') {
    return twMerge(buttonStyles(props), className);
}
