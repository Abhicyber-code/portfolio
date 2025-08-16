import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import ScrollProgress from '@/components/ScrollProgress'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Abhijeet Gitte | Full-Stack Engineer',
  description: 'Final-year IT undergraduate specializing in high-performance web applications',
  openGraph: {
    title: 'Abhijeet Gitte | Full-Stack Engineer',
    description: 'Final-year IT undergraduate specializing in high-performance web applications',
    images: ['/og-image.png'],
  },
  keywords: 'Full-Stack Engineer, React, Next.js, Node.js, JavaScript, Software Developer',
  robots: 'index, follow',
  themeColor: '#0a0a1f',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://your-domain.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={spaceGrotesk.className}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
