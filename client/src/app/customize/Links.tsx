"use client";
import { Button } from "@/components/ui/button";
import { IllustrationEmpty } from "@/components/ui/Icons";
import React from "react";

export default function Links() {
  return (
    <>
      <Button variant={"outline"} className="text-heading-s  mb-8 text-purple">
        + Add new link
      </Button>
      <div className="flex flex-col items-center rounded-lg bg-lightGray p-5 pb-12 text-center">
        <IllustrationEmpty />
        <h2 className="text-heading-m">Let’s get you started</h2>
        <p className="text-body-m">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </>
  );
}
