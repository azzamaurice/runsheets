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
        clone.style.top = '-99999px'
        clone.style.left = '-99999px'
        clone.style.width = `${offsetWidth}px`
        clone.style.height = `${offsetHeight}px`
        clone.style.borderRadius = '0'
        document.body.appendChild(clone)

        // Copy all computed styles recursively so cqw/container-relative
        // values are frozen as resolved pixels regardless of viewport
        const allOriginal = Array.from(outputEl.value.querySelectorAll('*')) as HTMLElement[]
        const allCloned = Array.from(clone.querySelectorAll('*')) as HTMLElement[]

        const copyStyles = (orig: HTMLElement, cloned: HTMLElement): void => {
            const cs = window.getComputedStyle(orig)
            for (let i = 0; i < cs.length; i++) {
                const prop = cs[i]
                if (prop) {
                    try {
                        cloned.style.setProperty(prop, cs.getPropertyValue(prop))
                    } catch {
                        // ignore read-only or invalid props
                    }
                }
            }
        }

        copyStyles(outputEl.value, clone)
        allOriginal.forEach((orig, i) => {
            const cloned = allCloned[i]
            if (cloned) copyStyles(orig, cloned)
        })

        const canvas = await html2canvas(clone, {
            scale: 2,
            width: offsetWidth,
            height: offsetHeight,
            backgroundColor: null,
            useCORS: true,
            logging: false
        })

        document.body.removeChild(clone)

        canvas.toBlob(async blob => {
            if (!blob) return
            const filename = `run-sheet-${serviceDate.value}.png`
            const file = new File([blob], filename, { type: 'image/png' })
            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({ files: [file], title: filename })
            } else {
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.download = filename
                link.href = url
                link.click()
                URL.revokeObjectURL(url)
            }
        }, 'image/png')
    }

    return { outputEl, exportPng }
}
