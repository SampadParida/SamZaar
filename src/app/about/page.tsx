import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
}

export default function Home() {
  return ( 
    <div>
      <h1>Pages About, Next.js!</h1>
    </div>
    )
}