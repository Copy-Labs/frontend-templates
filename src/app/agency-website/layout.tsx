import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEXUS COLLECTIVE | Creative Agency',
  description: 'Experimental creative agency pushing boundaries. Bold. Chaotic. Unforgettable.',
  keywords: ['creative agency', 'design', 'branding', 'experimental', 'bold'],
}

export default function AgencyWebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
