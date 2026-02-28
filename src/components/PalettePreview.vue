<script setup lang="ts">
defineProps<{
    palette: string[]
}>()
</script>

<template>
    <div class="flex overflow-hidden rounded-md shadow-md">
        <div
            v-for="(color, idx) in palette"
            :key="idx"
            class="size-10 flex-1"
            :style="{ backgroundColor: color }"
            :title="color"
        />
    </div>
</template>
