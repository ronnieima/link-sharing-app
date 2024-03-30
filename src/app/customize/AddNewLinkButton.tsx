"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { addLink } from "../actions";

type Props = {
  userId: string;
};

export default function AddNewLinkButton({ userId }: Props) {
  return (
    <Button
      onClick={async () => {
        const res = await addLink(userId);
        console.log(res);
      }}
      variant={"outline"}
      className="heading-s  mb-8 text-purple"
    >
      + Add new link
    </Button>
  );
}
