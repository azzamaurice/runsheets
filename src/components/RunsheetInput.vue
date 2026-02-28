<script setup lang="ts">
import { ref } from 'vue';
import { cva } from 'class-variance-authority';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RunSheetItem } from '@/types/runsheet';

const props = defineProps<{
    title: string;
    date: string;
    items: RunSheetItem[];
}>();

const emit = defineEmits<{
    'update:title': [value: string];
    'update:date': [value: string];
    'update:items': [value: RunSheetItem[]];
    print: [];
    export: [];
}>();

const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

const itemRowStyles = cva('flex items-start gap-2 p-3 bg-accent/50 rounded-md', {
    variants: {
        dragging: { true: 'opacity-40' },
        dragOver: { true: 'ring-2 ring-ring' },
    },
});

const removeButtonStyles = cva(
    'mt-2 text-danger hover:text-danger/70 text-xl leading-none transition-opacity',
    {
        variants: {
            disabled: { true: 'opacity-30 cursor-not-allowed' },
        },
    }
);

const nextId = (): number => Date.now() + Math.random();

const addItem = (): void => {
    emit('update:items', [...props.items, { id: nextId(), time: '', title: '', description: '' }]);
};

const removeItem = (index: number): void => {
    if (props.items.length <= 1) return;
    const updated = props.items.filter((_, i) => i !== index);
    emit('update:items', updated);
};

const updateItem = (index: number, field: keyof RunSheetItem, value: string): void => {
    const updated = props.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
    );
    emit('update:items', updated);
};

const onDragStart = (index: number, event: DragEvent): void => {
    dragIndex.value = index;
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
};

const onDragOver = (index: number): void => {
    if (dragIndex.value === null || dragIndex.value === index) return;
    const updated = [...props.items];
    const [dragged] = updated.splice(dragIndex.value, 1);
    if (dragged) updated.splice(index, 0, dragged);
    emit('update:items', updated);
    dragIndex.value = index;
    dragOverIndex.value = index;
};

const onDragEnd = (): void => {
    dragIndex.value = null;
    dragOverIndex.value = null;
};
</script>

<template>
    <div class="flex flex-col gap-4 overflow-auto print:block">
        <div class="bg-card rounded-lg shadow-md p-6 print:hidden">
            <div class="mb-4">
                <Label for="service-title">Service Title</Label>
                <Input
                    id="service-title"
                    :model-value="title"
                    type="text"
                    placeholder="e.g. Sunday Morning Service"
                    class="mt-1"
                    @update:model-value="emit('update:title', $event as string)"
                />
            </div>

            <div class="mb-6">
                <Label for="service-date">Date</Label>
                <Input
                    id="service-date"
                    :model-value="date"
                    type="date"
                    class="mt-1"
                    @update:model-value="emit('update:date', $event as string)"
                />
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
                        class="cursor-grab text-muted-foreground hover:text-foreground mt-2"
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
                <Button class="flex-1" @click="emit('print')">Print</Button>
                <Button intent="secondary" class="flex-1" @click="emit('export')"
                    >Export PNG</Button
                >
            </div>
        </div>
    </div>
</template>
