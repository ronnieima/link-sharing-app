import { getUser } from "@/lib/auth";
import { getLinks } from "@/actions/link";
import { redirect } from "next/navigation";
import LinkInfo from "./LinkInfo";

export default async function LinkInfoLoader() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }
  const links = await getLinks(user.id);
  return <LinkInfo user={user} links={links.data} />;
}
