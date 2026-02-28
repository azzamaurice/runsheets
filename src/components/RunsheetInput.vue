<script setup lang="ts">
import { ref } from 'vue'
import { cva } from 'class-variance-authority'
import { PhDownload, PhEraser, PhMinus, PhPlus, PhPrinter } from '@phosphor-icons/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FormControl from '@/components/ui/form-control/FormControl.vue'
import { useRunsheet } from '@/composables/useRunsheet'
import { useExport } from '@/composables/useExport'

const { serviceTitle, serviceDate, items, addItem, removeItem, updateItem, reset } = useRunsheet()
const { exportPng } = useExport()

const dragIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const itemRowStyles = cva('bg-background-body flex items-start gap-2 rounded-md p-3', {
    variants: {
        dragging: { true: 'opacity-40' },
        dragOver: { true: 'ring-ring ring-2' }
    }
})

const onDragStart = (index: number, event: DragEvent): void => {
    dragIndex.value = index
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

const onDragOver = (index: number): void => {
    if (dragIndex.value === null || dragIndex.value === index) return
    const dragged = items.value.splice(dragIndex.value, 1)[0]
    if (dragged) items.value.splice(index, 0, dragged)
    dragIndex.value = index
    dragOverIndex.value = index
}

const onDragEnd = (): void => {
    dragIndex.value = null
    dragOverIndex.value = null
}

const handlePrint = (): void => window.print()
</script>

<template>
    <div class="flex flex-col gap-4 print:block">
        <div class="bg-background rounded-lg p-6 shadow-md print:hidden">
            <FormControl class="mb-4">
                <Label for="service-title">Service Title</Label>
                <Input
                    id="service-title"
                    v-model="serviceTitle"
                    type="text"
                    placeholder="e.g. Sunday Morning Service" />
            </FormControl>

            <FormControl class="mb-6">
                <Label for="service-date">Date</Label>
                <Input
                    id="service-date"
                    v-model="serviceDate"
                    type="date" />
            </FormControl>

            <hr class="border-border my-6" />

            <div class="space-y-3">
                <div
                    v-for="(item, index) in items"
                    :key="item.id"
                    :class="
                        itemRowStyles({
                            dragging: dragIndex === index,
                            dragOver: dragOverIndex === index && dragIndex !== index
                        })
                    "
                    draggable
                    @dragstart="onDragStart(index, $event)"
                    @dragover.prevent="onDragOver(index)"
                    @dragend="onDragEnd">
                    <span
                        class="text-foreground/50 hover:text-foreground mt-2 cursor-grab"
                        title="Drag to reorder"
                        >⠿</span
                    >
                    <div class="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
                        <FormControl class="min-w-0">
                            <Label :for="`time-${item.id}`">Start Time</Label>
                            <Input
                                :id="`time-${item.id}`"
                                :model-value="item.time"
                                type="time"
                                class="w-full min-w-0"
                                @update:model-value="updateItem(index, 'time', $event as string)" />
                        </FormControl>
                        <FormControl>
                            <Label :for="`title-${item.id}`">Title</Label>
                            <Input
                                :id="`title-${item.id}`"
                                :model-value="item.title"
                                type="text"
                                placeholder="e.g. Worship Set"
                                @update:model-value="
                                    updateItem(index, 'title', $event as string)
                                " />
                        </FormControl>
                        <FormControl>
                            <Label :for="`desc-${item.id}`">Description</Label>
                            <Input
                                :id="`desc-${item.id}`"
                                :model-value="item.description"
                                type="text"
                                placeholder="e.g. Led by worship team"
                                @update:model-value="
                                    updateItem(index, 'description', $event as string)
                                " />
                        </FormControl>
                    </div>
                    <Button
                        intent="primary"
                        variant="subtle"
                        icon
                        :disabled="items.length <= 1"
                        class="mt-auto shrink-0"
                        @click="removeItem(index)">
                        <PhMinus
                            weight="bold"
                            :size="16" />
                    </Button>
                </div>
            </div>

            <Button
                variant="subtle"
                class="mt-4 w-full"
                @click="addItem">
                <PhPlus
                    :size="16"
                    weight="bold" />
                Add Item
            </Button>

            <hr class="border-border my-6" />

            <div class="flex gap-4">
                <Button
                    variant="subtle"
                    @click="reset">
                    <PhEraser
                        weight="duotone"
                        :size="20" />
                    Reset
                </Button>
                <Button @click="handlePrint">
                    <PhPrinter
                        weight="duotone"
                        :size="20" />
                    Print
                </Button>
                <Button
                    intent="secondary"
                    class="flex-1"
                    @click="exportPng">
                    <PhDownload
                        weight="duotone"
                        :size="20" />
                    Save
                </Button>
            </div>
        </div>
    </div>
</template>
