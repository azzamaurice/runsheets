<script setup lang="ts">
import PaletteDropdown from '@/components/PaletteDropdown.vue';
import RunsheetInput from '@/components/RunsheetInput.vue';
import RunsheetOutput from '@/components/RunsheetOutput.vue';
</script>

<template>
    <div
        class="absolute inset-0 flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] gap-4 p-4 bg-background text-foreground"
    >
        <header class="md:col-span-2 flex items-center justify-between p-4 print:hidden">
            <h1 class="text-xl font-bold">Runsheets</h1>
            <PaletteDropdown />
        </header>

        <RunsheetInput />

        <RunsheetOutput />
    </div>
</template>
