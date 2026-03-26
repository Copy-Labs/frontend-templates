import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flow SaaS - Minimalist Dashboard for Modern Teams",
  description: "A clean, powerful SaaS platform that helps teams collaborate and ship faster. Built with simplicity in mind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        {children}
      </body>
    </html>
  );
}
