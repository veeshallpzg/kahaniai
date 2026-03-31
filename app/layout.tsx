import type { Metadata } from "next";
import { Inter, Hind } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hind = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KahaniAI - वायरल हिंदी कहानियां",
    template: "%s | KahaniAI"
  },
  description:
    "वायरल हिंदी कहानियां, सेकंडों में। AI-powered scriptwriter for Indian Podcasters.",
  keywords: [
    "AI",
    "Hindi stories",
    "podcast script",
    "Indian stories",
    "Kahani",
    "AI writer",
    "हिंदी कहानी",
    "पॉडकास्ट"
  ],
  authors: [{ name: "KahaniAI" }],
  creator: "KahaniAI",
  openGraph: {
    title: "KahaniAI - Viral Hindi Stories in Seconds",
    description: "AI-powered scriptwriter for Indian Podcasters",
    url: "https://kahani.ai",
    siteName: "KahaniAI",
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KahaniAI - वायरल हिंदी कहानियां",
    description: "AI-powered scriptwriter for Indian Podcasters",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="dark">
      <body
        className={`${inter.variable} ${hind.variable} font-sans bg-charcoal text-offwhite antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
