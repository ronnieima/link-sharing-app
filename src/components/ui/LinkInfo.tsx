import PreviewItem from "@/app/(main)/customize/_components/PreviewItem";
import { LinkType } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { User } from "lucia";
import Link from "next/link";
import React, { Suspense } from "react";

type Props = { user?: User; links?: LinkType[] };

export default function LinkInfo({ user, links }: Props) {
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      {user?.profilePictureUrl ? (
        <img
          src={user?.profilePictureUrl}
          alt="profile picture"
          className=" size-[96px] rounded-full border-4 border-purple"
        />
      ) : (
        <section className=" size-[94px] h-40 flex-grow rounded-full opacity-0"></section>
      )}
      <header className="flex w-4/5  flex-col items-center   gap-1 pb-8">
        {user?.firstName && user.lastName && (
          <h2 className={cn("heading-s", "w-full bg-white text-center")}>
            {fullName}
          </h2>
        )}
        {user?.email && (
          <Link
            href={`mailto:${user.email}`}
            className={cn("body-s w-full bg-white text-center text-gray")}
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
