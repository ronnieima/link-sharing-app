"use client";

import NavbarContainer from "@/components/NavbarContainer";
import { Button } from "@/components/ui/button";
import { LogoSmall, Preview } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { LinkIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthedNavbar() {
  const path = usePathname();
  return (
    <NavbarContainer>
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
    </NavbarContainer>
  );
}
