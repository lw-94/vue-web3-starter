// uno.config.ts
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  rules: [
    //border linear
    [
      /bdl-\[(.+)\]/,
      (match) => ({
        border: ` 1px solid transparent`,
        'background-clip': `padding-box, border-box`,
        'background-origin': `padding-box, border-box`,
        'background-image': `linear-gradient(to right, ${match[1]}, ${match[1]}), var(--vt-c-linear)`
      })
    ],
    // border
    [
      /bd-\[(.+)\]/,
      (match) => ({
        border: `1px solid ${match[1]}`
      })
    ]
  ],
  shortcuts: {
    texte: 'overflow-hidden text-ellipsis whitespace-nowrap'
  },
  theme: {
    colors: {}
  },
  presets: [presetUno()]
})
