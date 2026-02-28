import type { Ref } from 'vue'

interface PaletteModule {
    default: string[][]
}

interface UsePaletteReturn {
    colorPalettes: Ref<string[][]>
    isLoading: Ref<boolean>
    selectedPalette: Ref<string[]>
    selectPalette: (palette: string[]) => void
    clearPalette: () => void
    selectedScheme: Ref<string>
    selectScheme: (value: string) => void
    page: Ref<number>
    totalPages: Ref<number>
    nextPage: () => void
    prevPage: () => void
}

export type { PaletteModule, UsePaletteReturn }
