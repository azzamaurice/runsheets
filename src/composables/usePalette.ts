import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'
import { useStorage } from '@vueuse/core'
import type { Ref } from 'vue'

export const usePalette = (): {
    colorPalettes: Ref<string[][] | undefined>
    isFetching: Ref<boolean>
    fetchColors: () => void
    selectedPalette: Ref<string[]>
    selectPalette: (palette: string[]) => void
    clearPalette: () => void
} => {
    const {
        data: colorPalettes,
        refetch,
        isFetching
    } = useQuery({
        queryKey: ['colors'],
        queryFn: async (): Promise<string[][]> => {
            const res = await axios.post('https://api.huemint.com/color', {
                mode: 'transformer',
                temperature: '1.3',
                num_colors: 4,
                num_results: 10,
                adjacency: [
                    0,
                    '75',
                    '45',
                    '45',
                    '75',
                    0,
                    '0',
                    '0',
                    '45',
                    '0',
                    0,
                    '50',
                    '45',
                    '0',
                    '50',
                    0
                ],
                palette: ['-', '-', '-', '-']
            })
            return res.data.results.map((r: { palette: string[] }) => r.palette)
        },
        staleTime: Infinity,
        enabled: false
    })

    const selectedPalette = useStorage<string[]>('selected-palette', [])

    const fetchColors = (): void => {
        refetch()
    }

    const selectPalette = (palette: string[]): void => {
        selectedPalette.value = palette
    }

    const clearPalette = (): void => {
        selectedPalette.value = []
    }

    return { colorPalettes, isFetching, fetchColors, selectedPalette, selectPalette, clearPalette }
}
