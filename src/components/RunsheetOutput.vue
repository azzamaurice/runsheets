<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRunsheet } from '@/composables/useRunsheet';
import { useExport } from '@/composables/useExport';

const { serviceTitle, serviceDate, items } = useRunsheet();
const { outputEl } = useExport();

const containerEl = ref<HTMLElement | null>(null);

onMounted(() => {
    outputEl.value = containerEl.value;
});

const formattedDate = (): string => {
    if (!serviceDate.value) return '';
    const d = new Date(serviceDate.value + 'T00:00:00');
    return d.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const formatTime = (time: string): string => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h ?? '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
};
</script>

<template>
    <div
        ref="containerEl"
        class="bg-[color-mix(in_srgb,var(--background)_90%,black)] rounded-lg shadow-md p-8 overflow-auto"
    >
        <h1 class="text-2xl font-bold mb-2">{{ serviceTitle || 'Service Run Sheet' }}</h1>
        <p class="text-muted-foreground mb-6">{{ formattedDate() }}</p>

        <table class="w-full border-collapse">
            <thead>
                <tr class="border-b-2 border-foreground">
                    <th class="text-left py-2 pr-4">Time</th>
                    <th class="text-left py-2 pr-4">Item</th>
                    <th class="text-left py-2">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index" class="border-b border-border">
                    <td class="py-2 pr-4">{{ formatTime(item.time) }}</td>
                    <td class="py-2 pr-4 font-medium">{{ item.title }}</td>
                    <td class="py-2 text-muted-foreground">{{ item.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
