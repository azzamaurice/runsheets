<script setup lang="ts">
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import PaletteDropdown from '@/components/PaletteDropdown.vue';
import RunsheetInput from '@/components/RunsheetInput.vue';
import RunsheetOutput from '@/components/RunsheetOutput.vue';
import type { RunSheetItem } from '@/types/runsheet';

const nextId = (): number => Date.now() + Math.random();

const serviceTitle = useStorage<string>('service-title', '');
const serviceDate = useStorage<string>('service-date', new Date().toISOString().slice(0, 10));
const items = useStorage<RunSheetItem[]>('runsheet-items', [
    { id: nextId(), time: '09:00', title: '', description: '' },
]);

const outputRef = ref<InstanceType<typeof RunsheetOutput> | null>(null);

const handlePrint = (): void => window.print();
const handleExport = (): void => {
    outputRef.value?.exportPng();
};
</script>

<template>
    <div
        class="absolute inset-0 flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] gap-4 p-4 bg-background text-foreground"
    >
        <header class="md:col-span-2 flex items-center justify-between p-4 print:hidden">
            <h1 class="text-xl font-bold">Runsheets</h1>
            <PaletteDropdown />
        </header>

        <RunsheetInput
            :title="serviceTitle"
            :date="serviceDate"
            :items="items"
            @update:title="serviceTitle = $event"
            @update:date="serviceDate = $event"
            @update:items="items = $event"
            @print="handlePrint"
            @export="handleExport"
        />

        <RunsheetOutput ref="outputRef" :title="serviceTitle" :date="serviceDate" :items="items" />
    </div>
</template>
