import type { Ref } from 'vue'

export interface UseExportReturn {
    outputEl: Ref<HTMLElement | null>
    exportPng: () => Promise<void>
}
