<script setup lang="ts">
import { Dropdown } from 'floating-vue';
import { PhPalette } from '@phosphor-icons/vue';
import { Button } from '@/components/ui/button';
import PalettePreview from '@/components/PalettePreview.vue';
import { usePalette } from '@/composables/usePalette';

const { colorPalettes, fetchColors, selectedPalette, selectPalette } = usePalette();
</script>

<template>
    <div class="flex items-center gap-4">
        <PalettePreview v-if="selectedPalette.length" :palette="selectedPalette" />
        <Dropdown>
            <Button :icon="true">
                <PhPalette :size="20" />
            </Button>
            <template #popper>
                <div
                    class="w-80 p-3 space-y-3 bg-[color-mix(in_srgb,var(--background)_90%,black)] text-foreground rounded-lg border border-border"
                >
                    <Button class="w-full" @click="fetchColors()">Get Colors</Button>
                    <div v-if="colorPalettes?.length">
                        <p class="text-xs text-foreground/50 mb-2">Saved Palettes</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div
                                v-for="(palette, idx) in colorPalettes"
                                :key="idx"
                                class="cursor-pointer hover:ring-2 hover:ring-ring rounded-lg overflow-hidden"
                                @click="selectPalette(palette)"
                            >
                                <PalettePreview :palette="palette" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>
