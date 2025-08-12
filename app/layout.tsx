import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Space Exploration Database',
  description: 'Explore the cosmos with our comprehensive database of space missions, astronauts, and celestial bodies.',
  keywords: ['space', 'exploration', 'missions', 'astronauts', 'NASA', 'cosmos'],
  authors: [{ name: 'Space Exploration Database' }],
  openGraph: {
    title: 'Space Exploration Database',
    description: 'Explore the cosmos with our comprehensive database of space missions, astronauts, and celestial bodies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-cosmic-gradient bg-stars">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  )
}