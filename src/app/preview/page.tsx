import { getLinks } from "@/actions/link";
import LinkInfo from "@/components/ui/LinkInfo";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function PreviewPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const links = await getLinks(user.id);

  return (
    <main className=" ">
      <div className="absolute top-0 -z-10 hidden h-[357px] w-full rounded-b-[32px] bg-purple md:block"></div>
      <div className="flex h-screen  flex-col items-center justify-center rounded-3xl bg-white py-12 md:mx-auto md:h-full md:max-w-[349px] md:shadow-lg">
        <LinkInfo user={user} links={links.data} />
      </div>
    </main>
  );
}
