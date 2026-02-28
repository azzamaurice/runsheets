<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dropdown } from 'floating-vue'
import { PhPalette, PhCircleNotch } from '@phosphor-icons/vue'
import { Button } from '@/components/ui/button'
import Select from '@/components/ui/select/Select.vue'
import FormControl from '@/components/ui/form-control/FormControl.vue'
import { Label } from '@/components/ui/label'
import PalettePreview from '@/components/PalettePreview.vue'
import { usePalette } from '@/composables/usePalette'

const DEFAULT_PALETTE = ['#152e47', '#fdfcfc', '#dc5b3d', '#38a5c5']

const { colorPalettes, isFetching, fetchColors, selectedPalette, selectPalette, clearPalette } =
    usePalette()

const displayPalette = computed((): string[] =>
    selectedPalette.value.length ? selectedPalette.value : DEFAULT_PALETTE
)

const selectedScheme = ref<string | null>(null)
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
                    class="text-foreground border-border w-80 space-y-3 rounded-lg border bg-[color-mix(in_srgb,var(--background)_80%,black)] p-3">
                    <div class="flex gap-4">
                        <Button
                            variant="subtle"
                            @click="clearPalette">
                            Reset
                        </Button>
                        <Button
                            intent="secondary"
                            class="flex-1"
                            :disabled="isFetching"
                            @click="fetchColors">
                            <PhCircleNotch
                                v-if="isFetching"
                                :size="16"
                                class="animate-spin" />
                            {{ isFetching ? 'Fetching...' : 'Get Colors' }}
                        </Button>
                    </div>
                    <FormControl>
                        <Label>Colour Schemes</Label>
                        <Select
                            v-model="selectedScheme"
                            :options="[]"
                            placeholder="Pick a scheme..." />
                    </FormControl>
                    <div v-if="colorPalettes?.length">
                        <div class="grid grid-cols-2 gap-2">
                            <div
                                v-for="(palette, idx) in colorPalettes"
                                :key="idx"
                                class="hover:ring-ring cursor-pointer overflow-hidden rounded-lg hover:ring-2"
                                @click="selectPalette(palette)">
                                <PalettePreview :palette />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>
