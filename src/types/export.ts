import type { Ref } from 'vue'

interface UseExportReturn {
    outputEl: Ref<HTMLElement | null>
    exportPng: () => Promise<void>
}

export type { UseExportReturn }
