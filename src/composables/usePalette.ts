import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';
import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

export const usePalette = (): {
    colorPalettes: Ref<string[][] | undefined>;
    fetchColors: () => void;
    selectedPalette: Ref<string[]>;
    selectPalette: (palette: string[]) => void;
} => {
    const { data: colorPalettes, refetch } = useQuery({
        queryKey: ['colors'],
        queryFn: async (): Promise<string[][]> => {
            const res = await axios.post('https://api.huemint.com/color', {
                mode: 'transformer',
                num_colors: 4,
                temperature: '1.3',
                num_results: 10,
                adjacency: [
                    '0',
                    '80',
                    '55',
                    '55',
                    '80',
                    '0',
                    '35',
                    '35',
                    '55',
                    '35',
                    '0',
                    '35',
                    '55',
                    '35',
                    '35',
                    '0',
                ],
                palette: ['-', '-', '-', '-'],
            });
            return res.data.results.map((r: { palette: string[] }) => r.palette);
        },
        staleTime: Infinity,
        enabled: false,
    });

    const selectedPalette = useStorage<string[]>('selected-palette', []);

    const fetchColors = (): void => {
        refetch();
    };

    const selectPalette = (palette: string[]): void => {
        selectedPalette.value = palette;
    };

    return { colorPalettes, fetchColors, selectedPalette, selectPalette };
};
