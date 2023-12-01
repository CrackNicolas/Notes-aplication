import { Metadata } from 'next/types'
import { Inter } from 'next/font/google'

import { Props_layouts } from '@/types/props'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notes aplication',
  description: 'Create by Beltran Ricardo Nicolas Alejo',
}

export default function RootLayout({children}:Props_layouts){
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}