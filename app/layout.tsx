import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Galaxy from "./components/Galaxy";
import ParallaxGalaxy from "./components/ParallaxGalaxy";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space Gen | Advancing Humanity",
  description: "Space Gen is an aerospace manufacturer and space transportation services company building the next generation of reusable rockets.",
  keywords: ["Space", "Rocket", "Aerospace", "India", "SpaceX", "Mars", "Tech", "Startup"],
  openGraph: {
    title: "Space Gen | Advancing Humanity",
    description: "Building the infrastructure for the next century of human history.",
    url: "https://space-gen-india.vercel.app",
    siteName: "Space Gen",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Space Gen Launch Vehicle",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Gen",
    description: "Advancing Humanity through reusable spaceflight.",
    images: ["/social-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Galaxy />
        <ParallaxGalaxy />
        <Preloader />
        {children}
        <Navbar />
      </body>
    </html>
  );
}