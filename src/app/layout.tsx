import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prometheus Resume Optimizer',
  description: 'Professional resume optimization service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-orange-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Prometheus</h1>
              <Link href="/" className="hover:text-orange-200">Home</Link>
              <Link href="/dashboard" className="hover:text-orange-200">Dashboard</Link>
            </div>
            </nav>
        
        <main className="container mx-auto py-8">
          {children}
       
        </main>
      </body>
    </html>
  )
}