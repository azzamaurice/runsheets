import { useStorage } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'

const paletteModules: Record<string, () => Promise<{ default: string[][] }>> = {
    default: () => import('@/constants/palettes/default.json'),
    'high-contrast': () => import('@/constants/palettes/high-contrast.json'),
    'bright-light': () => import('@/constants/palettes/bright-light.json'),
    pastel: () => import('@/constants/palettes/pastel.json'),
    vibrant: () => import('@/constants/palettes/vibrant.json'),
    dark: () => import('@/constants/palettes/dark.json'),
    'hyper-color': () => import('@/constants/palettes/hyper-color.json')
}

const PAGE_SIZE = 10

const fnv1a = (str: string): number => {
    let hash = 0x811c9dc5
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i)
        hash = Math.imul(hash, 0x01000193)
    }
    return hash >>> 0
}

const deterministicShuffle = (palettes: string[][]): string[][] =>
    [...palettes].sort((a: string[], b: string[]): number => fnv1a(a.join('')) - fnv1a(b.join('')))

const allPalettes = ref<string[][]>([])
const selectedScheme = useStorage<string>('selected-scheme', 'default')
const isLoading = ref<boolean>(false)
const page = useStorage<number>('palette-page', 0)
const selectedPalette = useStorage<string[]>('selected-palette', [])

const loadPalettes = async (scheme: string, resetPage: boolean): Promise<void> => {
    isLoading.value = true
    const loader: () => Promise<{ default: string[][] }> =
        paletteModules[scheme] ?? paletteModules['default']!
    const module = await loader()
    allPalettes.value = deterministicShuffle(module.default)
    if (resetPage) {
        page.value = 0
    }
    isLoading.value = false
}

let initialized = false

watch(
    selectedScheme,
    (scheme: string): void => {
        void loadPalettes(scheme, initialized)
        initialized = true
    },
    { immediate: true }
)

const totalPages = computed((): number => Math.ceil(allPalettes.value.length / PAGE_SIZE))

const colorPalettes = computed((): string[][] => {
    const start: number = page.value * PAGE_SIZE
    return allPalettes.value.slice(start, start + PAGE_SIZE)
})

const nextPage = (): void => {
    if (page.value < totalPages.value - 1) {
        page.value += 1
    }
}

const prevPage = (): void => {
    if (page.value > 0) {
        page.value -= 1
    }
}

const selectPalette = (palette: string[]): void => {
    selectedPalette.value = palette
}

const clearPalette = (): void => {
    selectedPalette.value = []
}

const selectScheme = (value: string): void => {
    selectedScheme.value = value
}

export const usePalette = (): {
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
} => {
    return {
        colorPalettes,
        isLoading,
        selectedPalette,
        selectPalette,
        clearPalette,
        selectedScheme,
        selectScheme,
        page,
        totalPages,
        nextPage,
        prevPage
    }
}
