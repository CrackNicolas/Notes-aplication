import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { Metadata } from 'next/types'
import { Roboto } from 'next/font/google'

import Provider from '@/context/provider'

import { Props_layouts } from '@/frontend/types/props'

import './globals.css'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Aplicacion de notas',
  description: 'Creado por Beltran Ricardo Nicolas Alejo',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: Props_layouts) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={roboto.className}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}