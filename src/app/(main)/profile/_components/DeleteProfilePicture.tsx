"use client";

import { deleteProfilePicture } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function DeleteProfilePicture({ userId }: { userId: string }) {
  return (
    <Button
      variant={"link"}
      className="m-0 block p-0 text-left text-red"
      onClick={async () => {
        await deleteProfilePicture(userId);
        toast("Deleted profile picture", { type: "success" });
      }}
    >
      Delete image
    </Button>
  );
}
