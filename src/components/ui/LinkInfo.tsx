import PreviewItem from "@/app/(authed)/customize/PreviewItem";
import { LinkType } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { User } from "lucia";
import React from "react";

type Props = { user?: User; links?: LinkType[] };

export default function LinkInfo({ user, links }: Props) {
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      {user?.profilePictureUrl && (
        <img
          src={user?.profilePictureUrl}
          alt="profile picture"
          className=" size-[96px]   rounded-full border-4 border-purple"
        />
      )}
      <header className="flex flex-col items-center gap-2 bg-white pb-4">
        {fullName && (
          <h2 className={cn("heading-s ", "w-full text-center")}>{fullName}</h2>
        )}
        {user?.email && (
          <span className={cn("body-s w-full text-center  text-gray")}>
            {user?.email}
          </span>
        )}
      </header>
      {links && (
        <ul className="flex h-full flex-col gap-5">
          {links.map((link) => (
            <PreviewItem link={link} key={link.id} />
          ))}
        </ul>
      )}
    </>
  );
}
