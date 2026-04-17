import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurora Sound - Music Streaming",
  description: "Experience music in its purest form. Curated playlists, stunning visuals, immersive audio controls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="music-app">
        {children}
      </body>
    </html>
  );
}
