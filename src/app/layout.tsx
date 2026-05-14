import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UNI360° — Study Abroad, Elevated",
  description:
    "Your gateway to world-class education in Germany and the UK. Full visa support, scholarships, and personalised guidance from day one.",
  openGraph: {
    title: "UNI360° — Study Abroad, Elevated",
    description:
      "Your gateway to world-class education in Germany and the UK. Full visa support, scholarships, and personalised guidance from day one.",
    type: "website",
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
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body className="overflow-hidden">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#f0edff",
              fontFamily: "var(--font-space-grotesk), sans-serif",
            },
          }}
        />
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
