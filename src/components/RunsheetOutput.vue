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
    <!-- Outer: takes grid space, centers the ratio box -->
    <div class="h-full overflow-hidden">
        <!-- Ratio enforcer + container query context -->
        <div class="aspect-square max-h-full max-w-full w-full @container">
            <!-- Shadow wrapper: visual only, not exported -->
            <div class="size-full rounded-[1cqw] shadow-xl overflow-hidden">
                <!-- Content: exported via containerEl ref -->
                <div
                    ref="containerEl"
                    class="size-full bg-[color-mix(in_srgb,var(--background)_80%,black)] rounded-[1cqw] p-[4cqw] gap-[4cqw] text-[2.5cqw] grid grid-cols-[1fr_5fr]"
                >
                    <div class="relative">
                        <h1
                            class="text-[10cqw] font-bold -rotate-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-primary"
                        >
                            {{ serviceTitle || 'Service Run Sheet' }}
                        </h1>
                    </div>
                    <div>
                        <p class="text-secondary mb-[3cqw]">{{ formattedDate() }}</p>

                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="border-b-[0.3cqw] border-foreground">
                                    <th class="text-left py-[1cqw] pr-[2cqw]">Time</th>
                                    <th class="text-left py-[1cqw] pr-[2cqw]">Item</th>
                                    <th class="text-left py-[1cqw]">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in items"
                                    :key="index"
                                    class="border-b-[0.15cqw] border-border"
                                >
                                    <td class="py-[1cqw] pr-[2cqw]">{{ formatTime(item.time) }}</td>
                                    <td class="py-[1cqw] pr-[2cqw] font-medium">
                                        {{ item.title }}
                                    </td>
                                    <td class="py-[1cqw] text-secondary">{{ item.description }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
