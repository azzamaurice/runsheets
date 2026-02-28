import type { Ref } from 'vue'

import type { SelectOption } from '@/types/select'

export interface FontOption {
    label: string
    value: string
    family: string
    load: () => Promise<unknown>
}

export interface UseFontReturn {
    selectedFont: Ref<string>
    selectFont: (value: string) => void
    fontOptions: SelectOption[]
    fontFamily: Ref<string>
}
