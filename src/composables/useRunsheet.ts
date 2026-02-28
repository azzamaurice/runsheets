import { useStorage } from '@vueuse/core'
import type { Ref } from 'vue'

import type { RunSheetItem } from '@/types/runsheet'

const nextId = (): number => Date.now() + Math.random()

const serviceTitle = useStorage<string>('service-title', 'Creative')
const serviceDate = useStorage<string>('service-date', new Date().toISOString().slice(0, 10))
const items = useStorage<RunSheetItem[]>('runsheet-items', [
    { id: nextId(), time: '18:00', title: '', description: '' }
])

export const useRunsheet = (): {
    serviceTitle: Ref<string>
    serviceDate: Ref<string>
    items: Ref<RunSheetItem[]>
    addItem: () => void
    removeItem: (index: number) => void
    updateItem: (index: number, field: keyof RunSheetItem, value: string) => void
    reset: () => void
} => {
    const nextTime = (): string => {
        const last = items.value[items.value.length - 1]
        if (!last?.time) return ''
        const [h, m] = last.time.split(':').map(Number)
        const total = (h ?? 0) * 60 + (m ?? 0) + 5
        const hh = String(Math.floor(total / 60) % 24).padStart(2, '0')
        const mm = String(total % 60).padStart(2, '0')
        return `${hh}:${mm}`
    }

    const addItem = (): void => {
        items.value.push({ id: nextId(), time: nextTime(), title: '', description: '' })
    }

    const removeItem = (index: number): void => {
        if (items.value.length <= 1) return
        items.value.splice(index, 1)
    }

    const updateItem = (index: number, field: keyof RunSheetItem, value: string): void => {
        const item = items.value[index]
        if (item) item[field] = value as never
    }

    const reset = (): void => {
        serviceTitle.value = 'Creative'
        serviceDate.value = new Date().toISOString().slice(0, 10)
        items.value = [{ id: nextId(), time: '18:00', title: '', description: '' }]
    }

    return { serviceTitle, serviceDate, items, addItem, removeItem, updateItem, reset }
}
