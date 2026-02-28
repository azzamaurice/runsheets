import { useStorage } from '@vueuse/core'
import { find, map } from 'lodash'
import { computed, watch } from 'vue'

import type { FontOption, UseFontReturn } from '@/types/font'
import type { SelectOption } from '@/types/select'

const FONTS: FontOption[] = [
    {
        label: 'Jost',
        value: 'jost',
        family: 'Jost Variable',
        load: () => import('@fontsource-variable/jost')
    },
    {
        label: 'Inter',
        value: 'inter',
        family: 'Inter Variable',
        load: () => import('@fontsource-variable/inter')
    },
    {
        label: 'Space Grotesk',
        value: 'space-grotesk',
        family: 'Space Grotesk Variable',
        load: () => import('@fontsource-variable/space-grotesk')
    },
    {
        label: 'DM Sans',
        value: 'dm-sans',
        family: 'DM Sans Variable',
        load: () => import('@fontsource-variable/dm-sans')
    },
    {
        label: 'Plus Jakarta Sans',
        value: 'plus-jakarta-sans',
        family: 'Plus Jakarta Sans Variable',
        load: () => import('@fontsource-variable/plus-jakarta-sans')
    },
    {
        label: 'Outfit',
        value: 'outfit',
        family: 'Outfit Variable',
        load: () => import('@fontsource-variable/outfit')
    },
    {
        label: 'Manrope',
        value: 'manrope',
        family: 'Manrope Variable',
        load: () => import('@fontsource-variable/manrope')
    },
    {
        label: 'Urbanist',
        value: 'urbanist',
        family: 'Urbanist Variable',
        load: () => import('@fontsource-variable/urbanist')
    },
    {
        label: 'Lexend',
        value: 'lexend',
        family: 'Lexend Variable',
        load: () => import('@fontsource-variable/lexend')
    }
]

const selectedFont = useStorage<string>('selected-font', 'jost')
const loadedFonts = new Set<string>(['jost'])

const loadFont = async (value: string): Promise<void> => {
    const font: FontOption | undefined = find(FONTS, (f: FontOption): boolean => f.value === value)
    if (!font || loadedFonts.has(value)) return
    await font.load()
    loadedFonts.add(value)
}

watch(
    selectedFont,
    (value: string): void => {
        void loadFont(value)
    },
    { immediate: true }
)

const fontFamily = computed((): string => {
    const font: FontOption | undefined = find(
        FONTS,
        (f: FontOption): boolean => f.value === selectedFont.value
    )
    return font ? `'${font.family}', sans-serif` : "'Jost Variable', sans-serif"
})

const fontOptions: SelectOption[] = map(
    FONTS,
    (f: FontOption): SelectOption => ({
        label: f.label,
        value: f.value
    })
)

const selectFont = (value: string): void => {
    selectedFont.value = value
}

export const useFont = (): UseFontReturn => {
    return {
        selectedFont,
        selectFont,
        fontOptions,
        fontFamily
    }
}
