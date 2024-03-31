import { LinkType } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { User } from "lucia";
import { ArrowRight, Github } from "lucide-react";
import React from "react";
import PreviewItem from "./PreviewItem";

type Props = { user?: User; links?: LinkType[] };

export default function Preview({ user, links }: Props) {
  const fullName = `${user?.firstName} ${user?.lastName}`;
  return (
    <section className="hidden min-h-full w-1/3  items-center justify-center  rounded-lg bg-white py-16 lg:flex">
      <div className="relative ">
        <img src="images/illustration-phone-mockup.svg" alt="phone" />
        <div className="absolute top-0 flex h-full w-full flex-col items-center gap-[25px] px-8 py-16">
          {user?.profilePictureUrl && (
            <img
              src={user?.profilePictureUrl}
              alt="profile picture"
              className=" size-[96px]   rounded-full border-4 border-purple"
            />
          )}
          <header className="flex flex-col items-center gap-2 bg-white pb-4">
            {fullName && (
              <h2 className={cn("heading-s ", "w-full text-center")}>
                {fullName}
              </h2>
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
        </div>
      </div>
    </section>
  );
}
