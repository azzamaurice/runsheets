<script setup lang="ts">
import { ref, nextTick } from 'vue';
import html2canvas from 'html2canvas-pro';
import type { RunSheetItem } from '@/types/runsheet';

const props = defineProps<{
    title: string;
    date: string;
    items: RunSheetItem[];
}>();

const outputEl = ref<HTMLElement | null>(null);

const formattedDate = (): string => {
    if (!props.date) return '';
    const d = new Date(props.date + 'T00:00:00');
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

const exportPng = async (): Promise<void> => {
    await nextTick();
    if (!outputEl.value) return;

    const clone = outputEl.value.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.width = `${outputEl.value.offsetWidth}px`;
    document.body.appendChild(clone);

    const allOriginal = Array.from(outputEl.value.querySelectorAll('*')) as HTMLElement[];
    const allCloned = Array.from(clone.querySelectorAll('*')) as HTMLElement[];
    const computedBg = window.getComputedStyle(outputEl.value).backgroundColor;
    clone.style.backgroundColor = computedBg;

    allOriginal.forEach((orig, i) => {
        const cloned = allCloned[i];
        if (!cloned) return;
        const cs = window.getComputedStyle(orig);
        const props = [
            'color',
            'background-color',
            'border-color',
            'border-top-color',
            'border-bottom-color',
            'border-left-color',
            'border-right-color',
            'font-size',
            'font-weight',
            'font-family',
            'padding-top',
            'padding-bottom',
            'padding-left',
            'padding-right',
            'margin-top',
            'margin-bottom',
            'margin-left',
            'margin-right',
        ];
        props.forEach(prop => {
            const val = cs.getPropertyValue(prop);
            if (val) cloned.style.setProperty(prop, val);
        });
    });

    const pageBackground =
        window.getComputedStyle(document.documentElement).getPropertyValue('--background').trim() ||
        '#152e47';

    const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: pageBackground,
        useCORS: true,
        logging: false,
    });

    document.body.removeChild(clone);

    canvas.toBlob(blob => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `run-sheet-${props.date}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
};

defineExpose({ exportPng });
</script>

<template>
    <div ref="outputEl" class="bg-card rounded-lg shadow-md p-8 overflow-auto">
        <h1 class="text-2xl font-bold mb-2">{{ title || 'Service Run Sheet' }}</h1>
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
