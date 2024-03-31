import Navbar from "@/components/Navbar";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cloneElement } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
