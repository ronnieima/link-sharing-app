"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EmptyLinks from "./EmptyLinks";
import PreviewItem from "./PreviewItem";

export const defaultPlatforms = [
  {
    platform: "Github",
    link: "https://www.github.com/",
    icon: "/images/icon-github.svg",
  },
  {
    platform: "Youtube",
    link: "https://www.youtube.com/",
    icon: "/images/icon-youtube.svg",
  },
  {
    platform: "LinkedIn",
    link: "https://www.linkedin.com/",
    icon: "/images/icon-linkedin.svg",
  },
];

export type Platform = (typeof defaultPlatforms)[0];

export default function Links() {
  const [preview, setPreview] = useState<Platform[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>(defaultPlatforms);
  function handleAddLink() {
    if (platforms.length > 0 && preview.length <= defaultPlatforms.length) {
      const newPlatform = platforms.pop();
      setPlatforms([...platforms]);
      setPreview([...preview, newPlatform!]);
    }
  }

  return (
    <>
      <Button
        onClick={() => handleAddLink()}
        variant={"outline"}
        className="text-heading-s  text-purple mb-8"
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
                platforms={platforms}
                preview={preview}
                setPlatforms={setPlatforms}
                setPreview={setPreview}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
