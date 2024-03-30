"use client";
import { addLink } from "@/actions/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  userId: string;
};

export default function AddNewLinkButton({ userId }: Props) {
  return (
    <Button
      onClick={async () => {
        const res = await addLink(userId);
        if (res.code === "max_links") {
          toast(res.error, { type: "error" });
        }
      }}
      variant={"outline"}
      className="heading-s  mb-8 text-purple"
    >
      + Add new link
    </Button>
  );
}
