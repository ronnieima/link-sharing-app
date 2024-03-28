"use client";
import { Button } from "@/components/ui/button";
import EmptyLinks from "./EmptyLinks";
import PreviewItem from "./PreviewItem";
import { useLinkStore } from "@/stores/useLinkStore";

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
      <div className="flex flex-col items-center rounded-lg bg-lightGray p-5 pb-12 text-center">
        {preview.length === 0 ? (
          <EmptyLinks />
        ) : (
          <div>
            {preview.map((platform, index) => (
              <PreviewItem
                key={platform.platform}
                platform={platform}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
