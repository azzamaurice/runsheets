<script setup lang="ts">
import PaletteDropdown from '@/components/PaletteDropdown.vue';
import RunsheetInput from '@/components/RunsheetInput.vue';
import RunsheetOutput from '@/components/RunsheetOutput.vue';
import ThemeOverride from '@/components/ThemeOverride.vue';
</script>

<template>
    <div
        class="min-h-screen flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-4 p-4 bg-background text-foreground"
    >
        <header class="md:col-span-2 flex items-center justify-between print:hidden">
            <h1 class="text-xl font-bold">Runsheets</h1>
            <PaletteDropdown />
        </header>

        <RunsheetInput />

        <RunsheetOutput />
    </div>
    <ThemeOverride />
</template>
