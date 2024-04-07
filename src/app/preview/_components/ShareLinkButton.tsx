"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bounce, toast } from "react-toastify";

export default function ShareLinkButton({ userId }: { userId: string }) {
  const rootUrl = process.env.VERCEL_URL || "http://localhost:3000";
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(`${rootUrl}/card/${userId}`);
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
  );
}
