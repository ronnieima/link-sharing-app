"use client";
import NavbarContainer from "@/components/NavbarContainer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Bounce, toast } from "react-toastify";

export default function PreviewNavbar() {
  return (
    <NavbarContainer className="gap-4">
      <Link
        href="/customize"
        className={cn(
          "md:w-[159px] lg:w-[133px]",
          buttonVariants({ variant: "outline" }),
        )}
      >
        Back to Editor
      </Link>
      <Button
        onClick={() => {
          toast("The link has been copied to your clipboard!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            bodyStyle: { width: "100%" },
          });
        }}
        className={cn("md:w-[159px] lg:w-[133px]")}
      >
        Share Link
      </Button>
    </NavbarContainer>
  );
}
