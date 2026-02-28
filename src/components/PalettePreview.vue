<script setup lang="ts">
defineProps<{
    palette: string[];
    size?: 'sm' | 'md';
}>();
</script>

<template>
    <div class="flex rounded-lg overflow-hidden shadow-md">
        <div
            v-for="(color, idx) in palette"
            :key="idx"
            :class="size === 'sm' ? 'h-6' : 'w-8 h-8'"
            class="flex-1"
            :style="{ backgroundColor: color }"
            :title="color"
        />
    </div>
</template>
