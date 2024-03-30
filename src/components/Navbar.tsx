"use client";

import { cn } from "@/lib/utils";
import { LinkIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogoSmall, Preview } from "./ui/Icons";

export default function Navbar() {
  const path = usePathname();
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
            asChild
            className={cn("group", {
              "bg-lightPurple text-purple": path === "/customize",
            })}
          >
            <Link href={"/customize"}>
              <LinkIcon
                className={cn("group-hover:text-purple", {
                  "text-purple": path === "/customize",
                })}
              />
            </Link>
          </Button>
          <Button
            size={"tab"}
            variant={"tab"}
            asChild
            className={cn("group", {
              "bg-lightPurple text-purple": path === "/profile",
            })}
          >
            <Link href={"/profile"}>
              <UserCircle />
            </Link>
          </Button>
        </div>
        <Button size={"icon"} variant={"outline"} className="w-[52px]">
          <Preview />
        </Button>
      </section>
    </nav>
  );
}
