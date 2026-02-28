<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRunsheet } from '@/composables/useRunsheet'
import { useExport } from '@/composables/useExport'

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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const formatTime = (time: string): string => {
    if (!time) return ''
    const [h, m] = time.split(':')
    const hour = parseInt(h ?? '0')
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const h12 = hour % 12 || 12
    return `${h12}:${m} ${ampm}`
}
</script>

<template>
    <!-- Outer: takes grid space, centers the ratio box -->
    <div>
        <!-- Ratio enforcer + container query context -->
        <div class="aspect-square max-h-full max-w-full w-full @container">
            <!-- Shadow wrapper: visual only, not exported -->
            <div class="size-full rounded-[1cqw] shadow-xl print:shadow-none overflow-hidden">
                <!-- Content: exported via containerEl ref -->
                <div
                    ref="containerEl"
                    :style="{ '--item-count': items.length }"
                    class="size-full bg-[color-mix(in_srgb,var(--background)_80%,black)] rounded-[1cqw] p-[4cqw] gap-[4cqw] text-[2.5cqw] grid grid-cols-[1fr_5fr] print:bg-transparent"
                >
                    <div class="relative">
                        <h1
                            class="text-[10cqw] font-semibold -rotate-90 absolute uppercase top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-primary"
                        >
                            {{ serviceTitle || 'Service Run Sheet' }}
                        </h1>
                    </div>
                    <div class="flex flex-col justify-center gap-[4cqw]">
                        <p class="text-secondary">{{ formattedDate() }}</p>

                        <ul class="flex flex-col gap-[calc(4cqw/max(1,var(--item-count)/5))]">
                            <li
                                v-for="(item, index) in items"
                                :key="index"
                                class="flex items-center gap-[calc(6cqw/max(1,var(--item-count)/5))]"
                            >
                                <div
                                    class="font-bold opacity-75 text-[calc(4cqw/max(1,var(--item-count)/5))]"
                                >
                                    {{ formatTime(item.time) }}
                                </div>
                                <div
                                    class="flex flex-col gap-[calc(0.5cqw/max(1,var(--item-count)/5))]"
                                >
                                    <div
                                        class="text-primary text-[calc(5cqw/max(1,var(--item-count)/5))] font-semibold"
                                    >
                                        {{ item.title }}
                                    </div>
                                    <div
                                        v-if="!!item.description"
                                        class="text-secondary font-medium text-[calc(3.5cqw/max(1,var(--item-count)/5))]"
                                    >
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
