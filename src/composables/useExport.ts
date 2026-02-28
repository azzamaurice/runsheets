import { ref, nextTick } from 'vue'
import html2canvas from 'html2canvas-pro'
import { useRunsheet } from '@/composables/useRunsheet'

const outputEl = ref<HTMLElement | null>(null)

const EXPORT_SIZE = 1200

export const useExport = (): {
    outputEl: typeof outputEl
    exportPng: () => Promise<void>
} => {
    const { serviceDate } = useRunsheet()

    const exportPng = async (): Promise<void> => {
        await nextTick()
        if (!outputEl.value) return

        // Create a fixed-size off-screen container so cqw units resolve
        // at a canonical size regardless of the device viewport
        const wrapper = document.createElement('div')
        wrapper.style.position = 'fixed'
        wrapper.style.top = '-99999px'
        wrapper.style.left = '-99999px'
        wrapper.style.width = `${EXPORT_SIZE}px`
        wrapper.style.height = `${EXPORT_SIZE}px`
        wrapper.style.containerType = 'inline-size'
        document.body.appendChild(wrapper)

        const clone = outputEl.value.cloneNode(true) as HTMLElement
        clone.style.width = `${EXPORT_SIZE}px`
        clone.style.height = `${EXPORT_SIZE}px`
        clone.style.borderRadius = '0'
        wrapper.appendChild(clone)

        // Copy computed styles so colours resolve correctly
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
                'font-weight',
                'font-family'
            ].forEach(prop => {
                const val = cs.getPropertyValue(prop)
                if (val) cloned.style.setProperty(prop, val)
            })
        })

        await nextTick()

        const canvas = await html2canvas(clone, {
            scale: 2,
            width: EXPORT_SIZE,
            height: EXPORT_SIZE,
            backgroundColor: null,
            useCORS: true,
            logging: false
        })

        document.body.removeChild(wrapper)

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
