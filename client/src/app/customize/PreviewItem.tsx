import React, { Dispatch, SetStateAction } from "react";
import { Platform } from "./Links";
import { Button } from "@/components/ui/button";

type Props = {
  platform: Platform;
  index: number;
  preview: Platform[];
  platforms: Platform[];
  setPreview: Dispatch<SetStateAction<Platform[]>>;
  setPlatforms: Dispatch<SetStateAction<Platform[]>>;
};

export default function PreviewItem({
  platform,
  index,
  platforms,
  preview,
  setPlatforms,
  setPreview,
}: Props) {
  function handleRemoveLink(index: number) {
    const updatedPreview = [...preview];
    const deletedLink = updatedPreview.splice(index, 1);
    setPreview(updatedPreview);
    setPlatforms([...platforms, ...deletedLink]);
  }
  return (
    <div>
      <p>#{index + 1}</p>
      {platform.platform}
      <p>{platform.link}</p>
      <Button variant={"link"} onClick={() => handleRemoveLink(index)}>
        Remove link
      </Button>
    </div>
  );
}
