import { getUser } from "@/lib/auth";
import { getLinks } from "@/actions/link";
import { redirect } from "next/navigation";
import LinkInfo from "./LinkInfo";
import { getUserById } from "@/actions/profile";

export default async function LinkInfoLoader({ userId }: { userId?: string }) {
  const user = userId ? await getUserById(userId) : await getUser();
  if (!user) {
    return redirect("/login");
  }

  const links = await getLinks(user.id);
  return <LinkInfo user={user} links={links.data} />;
}
