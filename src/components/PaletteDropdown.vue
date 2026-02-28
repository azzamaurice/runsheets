<script setup lang="ts">
import { PhCaretLeft, PhCaretRight, PhPalette } from '@phosphor-icons/vue'
import { Dropdown } from 'floating-vue'
import { map } from 'lodash'
import { computed } from 'vue'

import PalettePreview from '@/components/PalettePreview.vue'
import { Button } from '@/components/ui/button'
import FormControl from '@/components/ui/form-control/FormControl.vue'
import Select from '@/components/ui/select/Select.vue'
import { useFont } from '@/composables/useFont'
import { usePalette } from '@/composables/usePalette'
import { COLOUR_SCHEMES } from '@/constants/colourSchemes'
import type { SelectOption } from '@/types/select'

const DEFAULT_PALETTE: string[] = ['#152e47', '#fdfcfc', '#dc5b3d', '#38a5c5']

const {
    colorPalettes,
    selectedPalette,
    selectPalette,
    clearPalette,
    selectedScheme,
    selectScheme,
    page,
    totalPages,
    nextPage,
    prevPage
} = usePalette()

const displayPalette = computed((): string[] =>
    selectedPalette.value.length ? selectedPalette.value : DEFAULT_PALETTE
)

const { selectedFont, selectFont, fontOptions } = useFont()

const resetAll = (): void => {
    clearPalette()
    selectScheme('default')
    selectFont('jost')
}

const schemeOptions: SelectOption[] = map(
    COLOUR_SCHEMES,
    (s: SelectOption): SelectOption => ({
        label: s.label,
        value: s.value
    })
)
</script>

<template>
    <div class="flex items-center gap-4">
        <PalettePreview
            :palette="displayPalette"
            class="ring-primary/50 ring" />

        <Dropdown
            theme="bare"
            :overflow-padding="16">
            <Button icon>
                <PhPalette
                    weight="duotone"
                    :size="20" />
            </Button>

            <template #popper>
                <div
                    class="text-foreground border-border bg-background w-80 space-y-3 rounded-lg border p-3">
                    <div class="flex gap-4">
                        <Button
                            variant="subtle"
                            @click="resetAll">
                            Reset
                        </Button>
                        <FormControl class="flex-1">
                            <Select
                                :model-value="selectedScheme"
                                :options="schemeOptions"
                                @update:model-value="selectScheme($event as string)" />
                        </FormControl>
                    </div>
                    <FormControl>
                        <Select
                            :model-value="selectedFont"
                            :options="fontOptions"
                            @update:model-value="selectFont($event as string)" />
                    </FormControl>
                    <div class="grid grid-cols-2 gap-2">
                        <div
                            v-for="(palette, idx) in colorPalettes"
                            :key="idx"
                            class="ring-primary/50 hover:ring-primary/60 cursor-pointer overflow-hidden rounded-lg ring hover:ring-4"
                            @click="selectPalette(palette)">
                            <PalettePreview :palette />
                        </div>
                    </div>
                    <div
                        v-if="totalPages > 1"
                        class="flex items-center justify-between">
                        <Button
                            icon
                            :disabled="page === 0"
                            @click="prevPage">
                            <PhCaretLeft
                                weight="bold"
                                :size="20" />
                        </Button>
                        <span class="font-medium opacity-80">
                            {{ page + 1 }} / {{ totalPages }}
                        </span>
                        <Button
                            icon
                            :disabled="page === totalPages - 1"
                            @click="nextPage">
                            <PhCaretRight
                                weight="bold"
                                :size="20" />
                        </Button>
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>
