import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICT Trading Preparation & Journaling System",
  description: "Forex decision support, risk validation, and performance journaling built on ICT concepts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-gold-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
