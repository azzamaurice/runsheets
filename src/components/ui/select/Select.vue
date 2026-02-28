<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

type SelectValue = string | number | undefined | null

interface SelectOption {
    label: string
    value: SelectValue
}

const props = defineProps<{
    options: SelectOption[]
    modelValue?: SelectValue
    defaultValue?: SelectValue
    intent?: 'default' | 'danger'
    placeholder?: string
    class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', payload: SelectValue): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue
})

const selectStyles = cva(
    'bg-input text-foreground focus-visible:ring-ring/60 h-10 w-full min-w-0 cursor-pointer appearance-none rounded-md border px-3 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            intent: {
                default: 'border-border focus-visible:border-ring',
                danger: 'border-danger focus-visible:ring-danger/60'
            }
        },
        defaultVariants: {
            intent: 'default'
        }
    }
)
</script>

<template>
    <select
        v-model="modelValue"
        data-slot="select"
        :class="cn(selectStyles({ intent }), props.class)">
        <option
            v-if="placeholder"
            :value="null"
            disabled>
            {{ placeholder }}
        </option>
        <option
            v-for="option in options"
            :key="String(option.value)"
            :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>
