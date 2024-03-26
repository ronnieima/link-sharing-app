import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function MaxWidthContainer({ className, children }: Props) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[80rem] px-2.5 sm:px-20", className)}
    >
      {children}
    </div>
  );
}
