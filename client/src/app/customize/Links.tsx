"use client";
import { Button } from "@/components/ui/button";
import { useLinkStore } from "@/stores/useLinkStore";
import EmptyLinks from "./EmptyLinks";
import LinkForm from "./LinkForm";

export default function Links() {
  const handleAddLink = useLinkStore((state) => state.handleAddLink);
  const preview = useLinkStore((state) => state.preview);

  return (
    <>
      <Button
        onClick={handleAddLink}
        variant={"outline"}
        className="text-heading-s  mb-8 text-purple"
      >
        + Add new link
      </Button>

      {preview.length === 0 ? <EmptyLinks /> : <LinkForm />}
    </>
  );
}
