import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

const buttonVariants = cva(
    'focus-visible:ring-ring/60 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            intent: {
                primary: '',
                secondary: ''
            },
            variant: {
                default: '',
                outline: 'border bg-transparent',
                subtle: '',
                text: 'bg-transparent px-0 underline-offset-4 hover:underline'
            },
            icon: {
                true: 'size-10 px-0',
                false: ''
            }
        },
        compoundVariants: [
            {
                intent: 'primary',
                variant: 'default',
                class: 'bg-primary text-primary-foreground hover:bg-primary/80'
            },
            {
                intent: 'primary',
                variant: 'outline',
                class: 'border-primary text-primary hover:bg-primary/10'
            },
            {
                intent: 'primary',
                variant: 'subtle',
                class: 'bg-primary/15 text-primary hover:bg-primary/25'
            },
            { intent: 'primary', variant: 'text', class: 'text-primary' },
            {
                intent: 'secondary',
                variant: 'default',
                class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            },
            {
                intent: 'secondary',
                variant: 'outline',
                class: 'border-secondary text-secondary hover:bg-secondary/10'
            },
            {
                intent: 'secondary',
                variant: 'subtle',
                class: 'bg-secondary/15 text-secondary hover:bg-secondary/25'
            },
            { intent: 'secondary', variant: 'text', class: 'text-secondary' }
        ],
        defaultVariants: {
            intent: 'primary',
            variant: 'default',
            icon: false
        }
    }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

export { buttonVariants }
export type { ButtonVariants }
