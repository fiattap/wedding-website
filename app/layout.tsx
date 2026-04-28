import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fiat & Derek Wedding",
  description: "January 23, 2027 · Phuket, Thailand",

  // ✅ Open Graph (iMessage, Facebook, etc.)
  openGraph: {
    title: "Fiat & Derek Wedding",
    description: "Join us in Phuket to celebrate our wedding",
    url: "https://fiatandderek.com",
    siteName: "Fiat & Derek Wedding",
    images: [
      {
        url: "/og-image.jpg", // 👉 add this image in /public
        width: 1200,
        height: 630,
        alt: "Fiat & Derek Wedding",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ Twitter (also used by iMessage sometimes)
  twitter: {
    card: "summary_large_image",
    title: "Fiat & Derek Wedding",
    description: "January 23, 2027 · Phuket, Thailand",
    images: ["/og-image.jpg"],
  },

  // ✅ Icons (optional but clean)
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f6f3ef] text-[#4f4842]">
        {children}
      </body>
    </html>
  );
}