import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/components/TranslationProvider";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import BackgroundEffects from "@/components/BackgroundEffects";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal"
});

export const metadata: Metadata = {
  title: "Elite Construction & Real Estate",
  description: "Premium construction and geotechnical services in Kuwait.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${tajawal.variable} font-sans bg-stone-50 text-stone-900 antialiased selection:bg-stone-300 selection:text-stone-900`}
      >
        <Preloader />
        <BackgroundEffects />
        <TranslationProvider>
          <div className="flex min-h-screen flex-col overflow-hidden relative">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
