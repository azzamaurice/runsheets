import type { Ref } from 'vue'

interface RunSheetItem {
    id: number
    time: string
    title: string
    description: string
}

interface UseRunsheetReturn {
    serviceTitle: Ref<string>
    serviceDate: Ref<string>
    items: Ref<RunSheetItem[]>
    addItem: () => void
    removeItem: (index: number) => void
    updateItem: (index: number, field: keyof RunSheetItem, value: string) => void
    reset: () => void
}

export type { RunSheetItem, UseRunsheetReturn }
