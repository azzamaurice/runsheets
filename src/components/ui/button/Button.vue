<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
    intent?: ButtonVariants['intent']
    variant?: ButtonVariants['variant']
    icon?: boolean
    class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    intent: 'primary',
    variant: 'default',
    icon: false
})
</script>

<template>
    <Primitive
        data-slot="button"
        :as
        :as-child
        :class="cn(buttonVariants({ intent, variant, icon }), props.class)"
    >
        <slot />
    </Primitive>
</template>
