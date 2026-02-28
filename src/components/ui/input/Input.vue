<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';

const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    intent?: 'default' | 'danger';
    class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>

<template>
    <input
        v-model="modelValue"
        data-slot="input"
        :class="
            cn(
                'h-10 w-full min-w-0 rounded-md border bg-input px-3 text-sm text-foreground placeholder:text-muted-foreground transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50',
                'focus-visible:ring-4 focus-visible:ring-ring/60',
                intent === 'danger'
                    ? 'border-danger focus-visible:ring-danger/60'
                    : 'border-border focus-visible:border-ring',
                props.class
            )
        "
    />
</template>
