import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string | React.ReactElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, alt, ...props }, ref) => {
    return (
      <div>
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt={alt}
            className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform"
          />
        ) : icon ? (
          React.cloneElement(icon, {
            className:
              "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform",
          })
        ) : null}

        <input
          type={type}
          className={cn(
            "file:bg-transparent focus-visible:ring-neutral-950  flex h-10 w-full rounded-md border border-border bg-white px-3 py-2  text-sm ring-offset-white file:border-0 file:text-sm file:font-medium placeholder:text-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
            " caret-purple focus-visible:bg-white focus-visible:drop-shadow-[0_0px_20px_rgba(190,173,255,0.75)] ",
            { "pl-8": icon },
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
