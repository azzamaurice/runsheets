import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-4 focus-visible:ring-ring/60 cursor-pointer',
    {
        variants: {
            intent: {
                primary: '',
                secondary: '',
            },
            variant: {
                default: '',
                outline: 'border bg-transparent',
                subtle: '',
                text: 'bg-transparent underline-offset-4 hover:underline px-0',
            },
            icon: {
                true: 'size-10 px-0',
                false: '',
            },
        },
        compoundVariants: [
            {
                intent: 'primary',
                variant: 'default',
                class: 'bg-primary text-primary-foreground hover:bg-primary/80',
            },
            {
                intent: 'primary',
                variant: 'outline',
                class: 'border-primary text-primary hover:bg-primary/10',
            },
            {
                intent: 'primary',
                variant: 'subtle',
                class: 'bg-primary/15 text-primary hover:bg-primary/25',
            },
            { intent: 'primary', variant: 'text', class: 'text-primary' },
            {
                intent: 'secondary',
                variant: 'default',
                class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            },
            {
                intent: 'secondary',
                variant: 'outline',
                class: 'border-secondary text-secondary hover:bg-secondary/10',
            },
            {
                intent: 'secondary',
                variant: 'subtle',
                class: 'bg-secondary/15 text-secondary hover:bg-secondary/25',
            },
            { intent: 'secondary', variant: 'text', class: 'text-secondary' },
        ],
        defaultVariants: {
            intent: 'primary',
            variant: 'default',
            icon: false,
        },
    }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
