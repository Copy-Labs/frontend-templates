import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEO CARNIVAL 2026 | Where Chaos Meets Celebration",
  description: "The most electrifying tech conference of the year. Join us for an unforgettable experience of innovation, inspiration, and pure energy.",
};

export default function EventLandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
