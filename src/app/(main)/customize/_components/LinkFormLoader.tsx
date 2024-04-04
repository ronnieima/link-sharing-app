import { getLinks } from "@/actions/link";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import LinkForm from "./LinkForm";
import { getUser } from "@/lib/auth";

export default async function LinkFormLoader() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }
  const links = await getLinks(user.id);
  return <LinkForm links={links?.data} userId={user.id} />;
}
