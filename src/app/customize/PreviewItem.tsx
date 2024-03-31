import { LinkType } from "@/lib/db/schema";
import { PlatformKeys, platforms } from "@/stores/useLinkStore";
import { ArrowRight } from "lucide-react";
import React from "react";

type Props = { link: LinkType };

export default function PreviewItem({ link }: Props) {
  const { platform, url } = link;
  const currentPlatform = platforms[platform as PlatformKeys];
  return (
    <li
      style={{ background: currentPlatform.color }}
      className="h-[44px] w-[237px] rounded-lg text-white"
    >
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2 ">
          <img
            src={currentPlatform.icon}
            alt={`${currentPlatform.platform} Icon`}
            className="size-4"
          />
          <p>{currentPlatform.platform}</p>
        </div>
        <ArrowRight color="white" />
      </div>
    </li>
  );
}
