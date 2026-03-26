import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VERITY - Predict the Future | AI-Powered Analytics',
  description: 'VERITY uses neural networks to predict outcomes, not just report history. Know what will happen. Before it happens. Act first.',
  keywords: ['AI analytics', 'predictive analytics', 'neural networks', 'business intelligence', 'future prediction'],
  openGraph: {
    title: 'VERITY - Your Data Knows The Future',
    description: 'Predict outcomes, not just history. Know what will happen before it happens.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
