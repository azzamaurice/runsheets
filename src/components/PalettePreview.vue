<script setup lang="ts">
defineProps<{
    palette: string[];
}>();
</script>

<template>
    <div class="flex rounded-md overflow-hidden shadow-md">
        <div
            v-for="(color, idx) in palette"
            :key="idx"
            class="flex-1 size-10"
            :style="{ backgroundColor: color }"
            :title="color"
        />
    </div>
</template>
