<script setup lang="ts">
import { ref } from 'vue';
import { cva } from 'class-variance-authority';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRunsheet } from '@/composables/useRunsheet';
import { useExport } from '@/composables/useExport';

const { serviceTitle, serviceDate, items, addItem, removeItem, updateItem, reset } = useRunsheet();
const { exportPng } = useExport();

const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

const itemRowStyles = cva(
    'flex items-start gap-2 p-3 bg-[color-mix(in_srgb,var(--background)_85%,black)] rounded-md',
    {
        variants: {
            dragging: { true: 'opacity-40' },
            dragOver: { true: 'ring-2 ring-ring' },
        },
    }
);

const removeButtonStyles = cva(
    'mt-2 text-danger hover:text-danger/70 text-xl leading-none transition-opacity',
    {
        variants: {
            disabled: { true: 'opacity-30 cursor-not-allowed' },
        },
    }
);

const onDragStart = (index: number, event: DragEvent): void => {
    dragIndex.value = index;
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
};

const onDragOver = (index: number): void => {
    if (dragIndex.value === null || dragIndex.value === index) return;
    const dragged = items.value.splice(dragIndex.value, 1)[0];
    if (dragged) items.value.splice(index, 0, dragged);
    dragIndex.value = index;
    dragOverIndex.value = index;
};

const onDragEnd = (): void => {
    dragIndex.value = null;
    dragOverIndex.value = null;
};

const handlePrint = (): void => window.print();
</script>

<template>
    <div class="flex flex-col gap-4 print:block">
        <div
            class="bg-[color-mix(in_srgb,var(--background)_80%,black)] rounded-lg shadow-md p-6 print:hidden"
        >
            <div class="mb-4">
                <Label for="service-title">Service Title</Label>
                <Input
                    id="service-title"
                    v-model="serviceTitle"
                    type="text"
                    placeholder="e.g. Sunday Morning Service"
                    class="mt-1"
                />
            </div>

            <div class="mb-6">
                <Label for="service-date">Date</Label>
                <Input id="service-date" v-model="serviceDate" type="date" class="mt-1" />
            </div>

            <hr class="my-6 border-border" />

            <div class="space-y-3">
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
                        class="cursor-grab text-foreground/50 hover:text-foreground mt-2"
                        title="Drag to reorder"
                        >⠿</span
                    >
                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <Label :for="`time-${item.id}`" class="text-xs">Start Time</Label>
                            <Input
                                :id="`time-${item.id}`"
                                :model-value="item.time"
                                type="time"
                                class="mt-1"
                                @update:model-value="updateItem(index, 'time', $event as string)"
                            />
                        </div>
                        <div>
                            <Label :for="`title-${item.id}`" class="text-xs">Title</Label>
                            <Input
                                :id="`title-${item.id}`"
                                :model-value="item.title"
                                type="text"
                                placeholder="e.g. Worship Set"
                                class="mt-1"
                                @update:model-value="updateItem(index, 'title', $event as string)"
                            />
                        </div>
                        <div>
                            <Label :for="`desc-${item.id}`" class="text-xs">Description</Label>
                            <Input
                                :id="`desc-${item.id}`"
                                :model-value="item.description"
                                type="text"
                                placeholder="e.g. Led by worship team"
                                class="mt-1"
                                @update:model-value="
                                    updateItem(index, 'description', $event as string)
                                "
                            />
                        </div>
                    </div>
                    <button
                        :class="removeButtonStyles({ disabled: items.length <= 1 })"
                        :disabled="items.length <= 1"
                        @click="removeItem(index)"
                    >
                        −
                    </button>
                </div>
            </div>

            <Button variant="outline" class="mt-4 w-full border-dashed" @click="addItem">
                + Add Item
            </Button>

            <hr class="my-6 border-border" />

            <div class="flex gap-4">
                <Button variant="outline" @click="reset">Reset</Button>
                <Button class="flex-1" @click="handlePrint">Print</Button>
                <Button intent="secondary" class="flex-1" @click="exportPng">Export PNG</Button>
            </div>
        </div>
    </div>
</template>
