<script setup lang="ts">
import { computed } from 'vue'
import { usePalette } from '@/composables/usePalette'
import { useFont } from '@/composables/useFont'

const { selectedPalette } = usePalette()
const { fontFamily } = useFont()

const isLight = (hex: string): boolean => {
    const r: number = parseInt(hex.slice(1, 3), 16)
    const g: number = parseInt(hex.slice(3, 5), 16)
    const b: number = parseInt(hex.slice(5, 7), 16)
    const luminance: number = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5
}

const css = computed((): string => {
    const rules: string[] = []

    const [background, foreground, primary, secondary] = selectedPalette.value
    if (background && foreground && primary && secondary) {
        const primaryForeground: string = isLight(primary) ? '#111111' : '#fdfcfc'
        const secondaryForeground: string = isLight(secondary) ? '#111111' : '#fdfcfc'
        const blendTarget: string = isLight(background) ? 'black' : 'white'
        rules.push(
            `--background: ${background}`,
            `--background-body: color-mix(in srgb, ${background} 90%, ${blendTarget})`,
            `--foreground: ${foreground}`,
            `--primary: ${primary}`,
            `--primary-foreground: ${primaryForeground}`,
            `--secondary: ${secondary}`,
            `--secondary-foreground: ${secondaryForeground}`
        )
    }

    rules.push(`font-family: ${fontFamily.value}`)

    return `:root {\n    ${rules.join(';\n    ')};\n}`
})
</script>

<template>
    <component :is="'style'">{{ css }}</component>
</template>
