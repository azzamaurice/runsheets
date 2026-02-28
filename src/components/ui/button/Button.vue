<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

import type { ButtonVariants } from '.'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
    intent?: ButtonVariants['intent']
    variant?: ButtonVariants['variant']
    icon?: boolean
    type?: 'button' | 'submit' | 'reset'
    class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    intent: 'primary',
    variant: 'default',
    icon: false,
    type: 'button'
})
</script>

<template>
    <Primitive
        data-slot="button"
        :as
        :as-child
        :type
        :class="cn(buttonVariants({ intent, variant, icon }), props.class)">
        <slot />
    </Primitive>
</template>
