import React from "react";
import LinkInfo from "./LinkInfo";
import { getLinks } from "@/actions/link";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LinkInfoLoader() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const links = await getLinks(user.id);
  return <LinkInfo user={user} links={links.data} />;
}
