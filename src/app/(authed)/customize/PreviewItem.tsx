"use client";
import { LinkType } from "@/lib/db/schema";
import { ArrowRight } from "lucide-react";
import { platforms } from "./LinkForm";
import { cloneElement } from "react";
import Link from "next/link";

type Props = { link: LinkType };

export default function PreviewItem({ link }: Props) {
  const { platform, url } = link;
  const currentPlatform = platforms.find(
    (platformMeta) => platformMeta.value === platform,
  );

  return (
    <li
      style={{ background: currentPlatform?.color }}
      className="h-[44px] w-[237px] rounded-lg text-white transition-opacity hover:opacity-70"
    >
      <Link href={link.url} target="_blank">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-2 ">
            {cloneElement(currentPlatform?.icon!, {
              className: "text-white size-4",
            })}
            <p>{currentPlatform?.platform}</p>
          </div>
          <ArrowRight color="white" />
        </div>
      </Link>
    </li>
  );
}
