import type { Ref } from 'vue'

export interface PaletteModule {
    default: string[][]
}

export interface UsePaletteReturn {
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
