import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function CardContainer({ className, children }: Props) {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg bg-white p-6 shadow-sm lg:w-2/3 lg:p-10",
      )}
    >
      {children}
    </div>
  );
}
