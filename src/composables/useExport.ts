import { ref, nextTick } from 'vue'
import html2canvas from 'html2canvas-pro'
import { useRunsheet } from '@/composables/useRunsheet'

const outputEl = ref<HTMLElement | null>(null)

export const useExport = (): {
    outputEl: typeof outputEl
    exportPng: () => Promise<void>
} => {
    const { serviceDate } = useRunsheet()

    const exportPng = async (): Promise<void> => {
        await nextTick()
        if (!outputEl.value) return

        const { offsetWidth, offsetHeight } = outputEl.value
        const clone = outputEl.value.cloneNode(true) as HTMLElement
        clone.style.position = 'fixed'
        clone.style.top = '-9999px'
        clone.style.left = '-9999px'
        clone.style.width = `${offsetWidth}px`
        clone.style.height = `${offsetHeight}px`
        clone.style.borderRadius = '0'
        document.body.appendChild(clone)

        const allOriginal = Array.from(outputEl.value.querySelectorAll('*')) as HTMLElement[]
        const allCloned = Array.from(clone.querySelectorAll('*')) as HTMLElement[]
        clone.style.backgroundColor = window.getComputedStyle(outputEl.value).backgroundColor

        allOriginal.forEach((orig, i) => {
            const cloned = allCloned[i]
            if (!cloned) return
            const cs = window.getComputedStyle(orig)
            ;[
                'color',
                'background-color',
                'border-color',
                'border-top-color',
                'border-bottom-color',
                'border-left-color',
                'border-right-color',
                'font-size',
                'font-weight',
                'font-family',
                'padding-top',
                'padding-bottom',
                'padding-left',
                'padding-right',
                'margin-top',
                'margin-bottom',
                'margin-left',
                'margin-right'
            ].forEach(prop => {
                const val = cs.getPropertyValue(prop)
                if (val) cloned.style.setProperty(prop, val)
            })
        })

        const pageBackground =
            window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--background')
                .trim() || '#152e47'

        const canvas = await html2canvas(clone, {
            scale: 2,
            backgroundColor: pageBackground,
            useCORS: true,
            logging: false
        })

        document.body.removeChild(clone)

        canvas.toBlob(blob => {
            if (!blob) return
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.download = `run-sheet-${serviceDate.value}.png`
            link.href = url
            link.click()
            URL.revokeObjectURL(url)
        }, 'image/png')
    }

    return { outputEl, exportPng }
}
