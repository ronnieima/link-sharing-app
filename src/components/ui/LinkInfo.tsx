import PreviewItem from "@/app/(main)/customize/_components/PreviewItem";
import { LinkType } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { User } from "lucia";
import Link from "next/link";
import React from "react";

type Props = { user?: User; links?: LinkType[] };

export default function LinkInfo({ user, links }: Props) {
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      {user?.profilePictureUrl ? (
        <img
          src={user?.profilePictureUrl}
          alt="profile picture"
          className=" size-[96px]  rounded-full border-4 border-purple"
        />
      ) : (
        <section className=" size-[94px] h-40 flex-grow rounded-full opacity-0"></section>
      )}
      <header className="flex w-full flex-col items-center gap-2  bg-white pb-4">
        {user?.firstName && user.lastName ? (
          <h2 className={cn("heading-s bg-white", "w-full text-center")}>
            {fullName}
          </h2>
        ) : (
          <h2 className={cn("heading-s opacity-0", "w-full text-center")}>
            {"No name"}
          </h2>
        )}
        {user?.email && (
          <Link
            href={`mailto:${user.email}`}
            className={cn("body-s w-full bg-white text-center  text-gray")}
          >
            {user?.email}
          </Link>
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
