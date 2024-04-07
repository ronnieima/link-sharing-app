import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { cn } from "@/lib/utils";

const instrumentSans = Instrument_Sans({ subsets: ["latin"], display: "swap" });

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
    <html lang="en" className=" bg-lightGray">
      <body
        className={cn("min-h-svh overflow-hidden", instrumentSans.className)}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
