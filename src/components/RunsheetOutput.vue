<script setup lang="ts">
import { onMounted, ref } from 'vue'

import logo from '@/assets/logo.svg?raw'
import { useExport } from '@/composables/useExport'
import { useRunsheet } from '@/composables/useRunsheet'

const { serviceTitle, serviceDate, items } = useRunsheet()
const { outputEl } = useExport()

const containerEl = ref<HTMLElement | null>(null)

onMounted(() => {
    outputEl.value = containerEl.value
})

const formattedDate = (): string => {
    if (!serviceDate.value) return ''
    const d = new Date(serviceDate.value + 'T00:00:00')
    return d.toLocaleDateString('en-AU', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    })
}

const formatTime = (time: string): string => {
    if (!time) return ''
    const [h, m] = time.split(':')
    const hour = parseInt(h ?? '0')
    const h12 = hour % 12 || 12
    return `${h12}:${m}`
}
</script>

<template>
    <!-- Outer: takes grid space, centers the ratio box -->
    <div>
        <!-- Ratio enforcer + container query context -->
        <div class="@container aspect-square max-h-full w-full max-w-full">
            <!-- Shadow wrapper: visual only, not exported -->
            <div class="size-full overflow-hidden rounded-[1cqw] shadow-xl print:shadow-none">
                <!-- Content: exported via containerEl ref -->
                <div
                    ref="containerEl"
                    :style="{ '--item-count': items.length }"
                    class="bg-background grid size-full grid-cols-[1fr_5fr] gap-[4cqw] rounded-[1cqw] p-[4cqw] text-[2.5cqw] print:bg-transparent">
                    <div class="relative">
                        <h1
                            class="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[14cqw] font-bold whitespace-nowrap uppercase">
                            {{ serviceTitle || 'Runsheet' }}
                        </h1>
                    </div>
                    <div class="flex flex-col justify-center gap-[4cqw]">
                        <div
                            class="text-secondary flex items-center justify-between text-[6cqw] font-semibold">
                            {{ formattedDate() }}
                            <div
                                v-html="logo"
                                class="[&>svg]:size-[8cqw]" />
                        </div>

                        <ul class="flex flex-col gap-[calc(3cqw/max(1,var(--item-count)/5))]">
                            <li
                                v-for="(item, index) in items"
                                :key="index"
                                class="flex items-center gap-[calc(5cqw/max(1,var(--item-count)/5))]">
                                <div
                                    class="text-right text-[calc(8.5cqw/max(1,var(--item-count)/5))] font-bold opacity-75">
                                    {{ formatTime(item.time) }}
                                </div>
                                <div
                                    class="flex flex-col gap-[calc(0.5cqw/max(1,var(--item-count)/5))]">
                                    <div
                                        class="text-primary text-[calc(5cqw/max(1,var(--item-count)/5))] font-semibold">
                                        {{ item.title }}
                                    </div>
                                    <div
                                        v-if="!!item.description"
                                        class="text-secondary text-[calc(3.5cqw/max(1,var(--item-count)/5))] font-light">
                                        {{ item.description }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
