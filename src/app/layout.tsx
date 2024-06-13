import type { Metadata } from 'next'
import { Noto_Sans_Display } from 'next/font/google'
import './globals.css'
import { FC, PropsWithChildren } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { cn } from '@/lib/utils'
import { CartContextProvider } from '@/context/cart'
import { Toaster } from 'sonner'

const font = Noto_Sans_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Online Store',
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={cn(font.className, 'p-3')}>
        <CartContextProvider>
          <div className='__next'>
            <div className='__layout flex flex-col gap-5 min-h-[calc(100vh-24px)]'>
              <Header />
              <main className='flex-grow'>{children}</main>
              <Footer />
            </div>
            <Toaster richColors />
          </div>
        </CartContextProvider>
      </body>
    </html>
  )
}

export default RootLayout
