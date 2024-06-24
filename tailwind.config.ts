import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/frontend/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      screens: {
        sz: '1610px'
      },
      boxShadow: {
        'sm': '0 0 7px 0px'
      },
      colors: {
        "primary": "#000000",
        "secondary": "#00ffff",
        "tertiary": "#ffffff",
        "room": "#141313",
        "fifth": "#808080",
        "sixth": "#141313a4",
        "error": "#ff0000"
      }
    }
  },
  plugins: [],
}
export default config
