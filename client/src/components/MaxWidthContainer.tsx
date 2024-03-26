import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function MaxWidthContainer({ className, children }: Props) {
  return (
    <div
      className={cn(
        "mx-auto min-h-screen w-full max-w-[80rem] px-8 sm:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
