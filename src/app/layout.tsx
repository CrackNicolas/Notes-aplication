import { ClerkProvider } from '@clerk/nextjs'

import { Metadata } from 'next/types'
import { Roboto } from 'next/font/google'

import ComponentNav from '@/frontend/components/partials/nav/container'

import { Props_layouts } from '@/frontend/types/props'

import './globals.css'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Notes aplication',
  description: 'Create by Beltran Ricardo Nicolas Alejo',
}

export default function RootLayout({ children }: Props_layouts) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          <ComponentNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}