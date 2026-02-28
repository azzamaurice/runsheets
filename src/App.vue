<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { cva } from 'class-variance-authority';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';
import { useStorage } from '@vueuse/core';
import { PhPalette } from '@phosphor-icons/vue';

interface RunSheetItem {
    id: number;
    time: string;
    title: string;
    description: string;
}

const itemRowStyles = cva('flex items-start gap-2 p-3 bg-gray-50 rounded-md', {
    variants: {
        dragging: {
            true: 'opacity-40',
        },
        dragOver: {
            true: 'ring-2 ring-blue-500',
        },
    },
});

const removeButtonStyles = cva(
    'mt-3 text-red-500 hover:text-red-700 text-xl leading-none transition-opacity',
    {
        variants: {
            disabled: {
                true: 'opacity-30 cursor-not-allowed',
            },
        },
    }
);

const serviceTitle = ref('');
const serviceDate = ref(new Date().toISOString().slice(0, 10));
const output = ref<HTMLElement | null>(null);

const { data: colorPalettes, refetch: fetchColors } = useQuery({
    queryKey: ['colors'],
    queryFn: async () => {
        const res = await axios.post('https://api.huemint.com/color', {
            mode: 'transformer',
            num_colors: 4,
            temperature: '1.3',
            num_results: 10,
            adjacency: [
                '0',
                '80',
                '55',
                '55',
                '80',
                '0',
                '35',
                '35',
                '55',
                '35',
                '0',
                '35',
                '55',
                '35',
                '35',
                '0',
            ],
            palette: ['-', '-', '-', '-'],
        });
        return res.data.results.map((r: { palette: string[] }) => r.palette);
    },
    staleTime: Infinity,
    enabled: false,
});

const selectedPalette = useStorage<string[]>('selected-palette', []);

function selectPalette(palette: string[]): void {
    selectedPalette.value = palette;
}

const items = ref<RunSheetItem[]>([{ id: nextId(), time: '09:00', title: '', description: '' }]);

const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

function nextId(): number {
    return Date.now() + Math.random();
}

const formattedDate = computed(() => {
    if (!serviceDate.value) return '';
    const d = new Date(serviceDate.value + 'T00:00:00');
    return d.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

function formatTime(time: string): string {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h ?? '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
}

function addItem(): void {
    items.value.push({ id: nextId(), time: '', title: '', description: '' });
}

function removeItem(index: number): void {
    if (items.value.length > 1) {
        items.value.splice(index, 1);
    }
}

function onDragStart(index: number, event: DragEvent) {
    dragIndex.value = index;
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
    }
}

function onDragOver(index: number) {
    if (dragIndex.value === null || dragIndex.value === index) return;
    const dragged = items.value.splice(dragIndex.value, 1)[0];
    if (dragged) {
        items.value.splice(index, 0, dragged);
    }
    dragIndex.value = index;
    dragOverIndex.value = index;
}

function onDragEnd() {
    dragIndex.value = null;
    dragOverIndex.value = null;
}

function printSheet() {
    window.print();
}

async function exportPng() {
    await nextTick();
    if (output.value) {
        const canvas = await html2canvas(output.value, { scale: 2 });
        const link = document.createElement('a');
        link.download = `run-sheet-${serviceDate.value}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}
</script>

<script lang="ts">
import { Dropdown } from 'floating-vue';
</script>

<template>
    <div
        class="absolute inset-0 flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] gap-4 p-4"
    >
        <header class="md:col-span-2 flex items-center justify-between p-4 print:hidden">
            <h1>Runsheets</h1>
            <div class="flex items-center gap-2">
                <div
                    v-if="selectedPalette.length"
                    class="flex rounded-lg overflow-hidden shadow-md"
                >
                    <div
                        v-for="(color, idx) in selectedPalette"
                        :key="idx"
                        class="w-8 h-8"
                        :style="{ backgroundColor: color }"
                        :title="color"
                    ></div>
                </div>
                <Dropdown>
                    <button
                        class="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <PhPalette :size="20" />
                    </button>
                    <template #popper>
                        <div class="w-80 p-3 space-y-3">
                            <button
                                @click="fetchColors()"
                                class="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                            >
                                Get Colors
                            </button>
                            <div v-if="colorPalettes?.length">
                                <p class="text-xs text-gray-500 mb-2">Saved Palettes</p>
                                <div class="grid grid-cols-2 gap-2">
                                    <div
                                        v-for="(palette, idx) in colorPalettes ?? []"
                                        :key="idx"
                                        class="flex rounded-lg overflow-hidden shadow-sm cursor-pointer hover:ring-2 hover:ring-purple-500"
                                        @click="selectPalette(palette)"
                                    >
                                        <div
                                            v-for="(color, cIdx) in palette"
                                            :key="cIdx"
                                            class="flex-1 h-8"
                                            :style="{ backgroundColor: color }"
                                            :title="color"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Dropdown>
            </div>
        </header>

        <div class="flex flex-col gap-4 overflow-auto print:block">
            <div class="bg-white rounded-lg shadow-md p-6 print:hidden">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Service Title</label
                    >
                    <input
                        v-model="serviceTitle"
                        type="text"
                        placeholder="e.g. Sunday Morning Service"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        v-model="serviceDate"
                        type="date"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <hr class="my-6" />

                <div class="space-y-4">
                    <div
                        v-for="(item, index) in items"
                        :key="item.id"
                        :class="
                            itemRowStyles({
                                dragging: dragIndex === index,
                                dragOver: dragOverIndex === index && dragIndex !== index,
                            })
                        "
                        draggable="true"
                        @dragstart="onDragStart(index, $event)"
                        @dragover.prevent="onDragOver(index)"
                        @dragend="onDragEnd"
                    >
                        <span
                            class="cursor-grab text-gray-400 hover:text-gray-600 mt-3"
                            title="Drag to reorder"
                            >⠿</span
                        >
                        <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label class="block text-xs text-gray-500 mb-1">Start Time</label>
                                <input
                                    v-model="item.time"
                                    type="time"
                                    class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label class="block text-xs text-gray-500 mb-1">Title</label>
                                <input
                                    v-model="item.title"
                                    type="text"
                                    placeholder="e.g. Worship Set"
                                    class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label class="block text-xs text-gray-500 mb-1">Description</label>
                                <input
                                    v-model="item.description"
                                    type="text"
                                    placeholder="e.g. Led by worship team"
                                    class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <button
                            @click="removeItem(index)"
                            :class="removeButtonStyles({ disabled: items.length <= 1 })"
                            :disabled="items.length <= 1"
                        >
                            −
                        </button>
                    </div>
                </div>

                <button
                    @click="addItem"
                    class="mt-4 w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 rounded-md transition-colors"
                >
                    + Add Item
                </button>

                <hr class="my-6" />

                <div class="flex gap-4">
                    <button
                        @click="printSheet"
                        class="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Print
                    </button>
                    <button
                        @click="exportPng"
                        class="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Export PNG
                    </button>
                </div>
            </div>
        </div>

        <div ref="output" class="bg-white rounded-lg shadow-md p-8 overflow-auto print:hidden">
            <h1 class="text-2xl font-bold mb-2">{{ serviceTitle || 'Service Run Sheet' }}</h1>
            <p class="text-gray-600 mb-6">{{ formattedDate }}</p>

            <table class="w-full border-collapse">
                <thead>
                    <tr class="border-b-2 border-black">
                        <th class="text-left py-2 pr-4">Time</th>
                        <th class="text-left py-2 pr-4">Item</th>
                        <th class="text-left py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in items"
                        :key="index"
                        class="border-b border-gray-200"
                    >
                        <td class="py-2 pr-4">{{ formatTime(item.time) }}</td>
                        <td class="py-2 pr-4 font-medium">{{ item.title }}</td>
                        <td class="py-2 text-gray-600">{{ item.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
