import { cva, VariantProps } from 'class-variance-authority';

export const dropDownMenuItemStyles = cva(
    'flex w-full items-center gap-x-2 rounded px-2 py-2 text-white transition',
    {
        variants: {
            active: {
                true: 'bg-indigo-500',
            },
            danger: {
                true: 'text-red-400',
            },
        },
        compoundVariants: [
            {
                active: true,
                danger: true,
                className: 'bg-red-500 text-red-100',
            },
        ],
    }
);

export type DropDownMenuItemStylesProps = VariantProps<
    typeof dropDownMenuItemStyles
>;
