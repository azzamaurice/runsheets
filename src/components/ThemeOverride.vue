<script setup lang="ts">
import { computed } from 'vue'
import { usePalette } from '@/composables/usePalette'

const { selectedPalette } = usePalette()

const isLight = (hex: string): boolean => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5
}

const css = computed((): string => {
    const [background, foreground, primary, secondary] = selectedPalette.value
    if (!background || !foreground || !primary || !secondary) return ''
    const primaryForeground: string = isLight(primary) ? '#111111' : '#fdfcfc'
    const secondaryForeground: string = isLight(secondary) ? '#111111' : '#fdfcfc'
    const blendTarget: string = isLight(background) ? 'black' : 'white'
    return `:root {
    --background: ${background};
    --background-body: color-mix(in srgb, ${background} 80%, ${blendTarget});
    --foreground: ${foreground};
    --primary: ${primary};
    --primary-foreground: ${primaryForeground};
    --secondary: ${secondary};
    --secondary-foreground: ${secondaryForeground};
}`
})
</script>

<template>
    <component
        :is="'style'"
        v-if="css"
        >{{ css }}</component
    >
</template>
