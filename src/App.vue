<script setup lang="ts">
import PaletteDropdown from '@/components/PaletteDropdown.vue'
import RunsheetInput from '@/components/RunsheetInput.vue'
import RunsheetOutput from '@/components/RunsheetOutput.vue'
import ThemeOverride from '@/components/ThemeOverride.vue'
</script>

<template>
    <div
        class="bg-background text-foreground flex min-h-screen flex-col gap-4 p-4 md:grid md:grid-cols-[1fr_2fr] md:grid-rows-[auto_1fr]"
    >
        <header class="flex items-center justify-between md:col-span-2 print:hidden">
            <h1 class="text-xl font-bold">Runsheets</h1>
            <PaletteDropdown />
        </header>

        <RunsheetInput />

        <RunsheetOutput />
    </div>
    <ThemeOverride />
</template>
