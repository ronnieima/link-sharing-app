"use client";

import { LinkIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogoSmall, Preview, ProfileDetailsHeader } from "./ui/Icons";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const path = usePathname();
  console.log({ path });
  return (
    <nav className="h-[74px] bg-lightGray md:px-6">
      <section className="flex h-full items-center justify-between rounded-lg bg-white px-6">
        <Link href="/">
          <LogoSmall />
        </Link>
        <div className="flex h-full items-center">
          <Button
            size={"tab"}
            variant={"tab"}
            className={cn("group", {
              "bg-lightPurple text-purple": path === "/customize",
            })}
          >
            <LinkIcon
              className={cn("group-hover:text-purple", {
                "text-purple": path === "/customize",
              })}
            />
          </Button>
          <Button
            size={"tab"}
            variant={"tab"}
            className={cn("group", {
              "bg-lightPurple text-purple": path === "/profile",
            })}
          >
            <UserCircle />
          </Button>
        </div>
        <Button size={"icon"} variant={"outline"} className="w-[52px]">
          <Preview />
        </Button>
      </section>
    </nav>
  );
}
