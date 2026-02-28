<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cva } from 'class-variance-authority'
import { PhCaretDown } from '@phosphor-icons/vue'
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
    'bg-input text-foreground focus-visible:ring-ring/60 h-10 w-full min-w-0 cursor-pointer appearance-none rounded-md border pr-8 pl-3 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            intent: {
                default: 'border-border focus-visible:border-foreground',
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
    <div class="relative">
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
        <PhCaretDown
            weight="bold"
            :size="14"
            class="text-foreground/50 pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2" />
    </div>
</template>
