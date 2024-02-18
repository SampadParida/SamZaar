import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from './components/Navbar';
import { CartContextProvider } from '../contexts/cartcontext';
import { AddressContextProvider } from '../contexts/addresscontext';
import { CommonContextProvider } from '../contexts/commonContext';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SamZaar',
  description: 'Aapka apna Samaan Bazaar | eCommerce app for shopping',
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children, }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommonContextProvider>
          <CartContextProvider>
            <AddressContextProvider>
              <Navbar />
              {children}
            </AddressContextProvider>
          </CartContextProvider>
        </CommonContextProvider>
      </body>
    </html>
  )
}
