import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/frontend/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "secondary": "#00ffff",
        "tertiary": "#ffffff",
        "room": "#141313",
        "fifth":"#808080",
        "sixth":"#141313dc"
      }
    }
  },
  plugins: [],
}
export default config
