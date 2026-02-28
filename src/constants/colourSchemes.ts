interface ColourScheme {
    label: string
    value: string
}

const COLOUR_SCHEMES: ColourScheme[] = [
    { label: 'Default', value: 'default' },
    { label: 'High Contrast', value: 'high-contrast' },
    { label: 'Bright & Light', value: 'bright-light' },
    { label: 'Pastel', value: 'pastel' },
    { label: 'Vibrant', value: 'vibrant' },
    { label: 'Dark', value: 'dark' },
    { label: 'Hyper Color', value: 'hyper-color' }
]

export type { ColourScheme }
export { COLOUR_SCHEMES }
