import { cva, VariantProps } from 'class-variance-authority';

export const iconButtonStyles = cva(
    'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
        variants: {
            visibleLabel: {
                true: 'items-center gap-x-2',
            },
        },
    }
);

export type IconButtonStylesProps = VariantProps<typeof iconButtonStyles>;
