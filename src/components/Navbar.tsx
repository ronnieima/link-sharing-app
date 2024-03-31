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
    <nav className="h-[74px] bg-lightGray md:h-[126px] md:p-6">
      <section className="flex h-full items-center justify-between rounded-lg bg-white px-6">
        <Link href="/customize">
          <img
            src="images/logo-devlinks-large.svg"
            className="hidden h-full w-full md:block"
          />
          <LogoSmall className="md:hidden" />
        </Link>
        <div className="flex w-1/2 justify-center gap-4  ">
          <Button
            size={"tab"}
            variant={"tab"}
            asChild
            className={cn("group max-w-[122px]", {
              "bg-lightPurple text-purple": path === "/customize",
            })}
          >
            <Link href={"/customize"} className="space-x-2">
              <LinkIcon
                className={cn("group-hover:text-purple", {
                  "text-purple": path === "/customize",
                })}
              />
              <span className="heading-s hidden md:block">Links</span>
            </Link>
          </Button>
          <Button
            size={"tab"}
            variant={"tab"}
            asChild
            className={cn("group max-w-[187px]", {
              "space-x-2 bg-lightPurple text-purple": path === "/profile",
            })}
          >
            <Link href={"/profile"} className="space-x-2">
              <UserCircle />
              <span className="heading-s hidden md:block">Profile Details</span>
            </Link>
          </Button>
        </div>
        <Button
          size={"icon"}
          variant={"outline"}
          asChild
          className="w-[52px] md:w-[114px]"
        >
          <Link href={"/preview"}>
            <span className="hidden md:block">Preview</span>
            <Preview className="md:hidden" />
          </Link>
        </Button>
      </section>
    </nav>
  );
}
