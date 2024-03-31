import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

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
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
