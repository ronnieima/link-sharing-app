import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "devlinks | Link-sharing for developers",
  description: "A link-sharing app for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-lightGray">
      <body className={instrumentSans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
