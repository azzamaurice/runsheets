<script setup lang="ts">
import PaletteDropdown from '@/components/PaletteDropdown.vue'
import RunsheetInput from '@/components/RunsheetInput.vue'
import RunsheetOutput from '@/components/RunsheetOutput.vue'
import ThemeOverride from '@/components/ThemeOverride.vue'
</script>

<template>
    <div class="bg-background text-foreground flex min-h-screen flex-col">
        <header
            class="bg-background sticky top-0 z-10 flex items-center justify-between px-4 py-3 print:hidden"
        >
            <h1 class="text-xl font-bold">Runsheets</h1>
            <PaletteDropdown />
        </header>

        <div class="flex flex-1 flex-col gap-4 p-4 md:grid md:grid-cols-[1fr_2fr]">
            <RunsheetInput />
            <RunsheetOutput />
        </div>
    </div>
    <ThemeOverride />
</template>
