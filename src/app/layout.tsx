import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L.I.S.A. - A Drone that Reaches Farther",
  description: "A quadcopter whose 3-D-printed arms telescope in flight",
  openGraph: {
    title: "L.I.S.A. - Telescopic Arm Drone",
    description: "A quadcopter whose 3-D-printed arms telescope in flight",
    url: "https://lisa-drone.vercel.app",
    siteName: "L.I.S.A. Drone Project",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#1e1e1e] text-white min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
