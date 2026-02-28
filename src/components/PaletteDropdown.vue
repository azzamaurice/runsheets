<script setup lang="ts">
import { Dropdown } from 'floating-vue';
import { PhPalette } from '@phosphor-icons/vue';
import { Button } from '@/components/ui/button';
import PalettePreview from '@/components/PalettePreview.vue';
import { usePalette } from '@/composables/usePalette';

const { colorPalettes, fetchColors, selectedPalette, selectPalette } = usePalette();
</script>

<template>
    <div class="flex items-center gap-2">
        <PalettePreview v-if="selectedPalette.length" :palette="selectedPalette" />
        <Dropdown>
            <Button :icon="true">
                <PhPalette :size="20" />
            </Button>
            <template #popper class="!bg-popover rounded-lg">
                <div class="w-80 p-3 space-y-3 bg-popover text-popover-foreground rounded-lg">
                    <Button class="w-full" @click="fetchColors()">Get Colors</Button>
                    <div v-if="colorPalettes?.length">
                        <p class="text-xs text-muted-foreground mb-2">Saved Palettes</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div
                                v-for="(palette, idx) in colorPalettes"
                                :key="idx"
                                class="cursor-pointer hover:ring-2 hover:ring-ring rounded-lg overflow-hidden"
                                @click="selectPalette(palette)"
                            >
                                <PalettePreview :palette="palette" size="sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>
