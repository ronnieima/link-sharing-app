import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/LogoutButton";
import { getLinks } from "../actions";
import AddNewLinkButton from "./AddNewLinkButton";
import EmptyLinks from "./EmptyLinks";
import LinkForm from "./LinkForm";

export default async function CustomizePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const links = await getLinks(user.id);

  return (
    <main className="p-4">
      <MaxWidthContainer className="rounded-t-lg bg-white p-6 shadow-sm lg:p-10">
        <header className="pb-10">
          <h1 className="heading-m">Customize your links</h1>
          <p className="body-m">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <span>User id: {user.id}</span>
          {links.error && (
            <span className="text-xs text-red">{links.error}</span>
          )}
        </header>

        <AddNewLinkButton userId={user.id} />
        {!links.data || links.data.length === 0 ? (
          <EmptyLinks />
        ) : (
          <LinkForm links={links.data} />
        )}
      </MaxWidthContainer>
      <section className="rounded-b-lg border-t border-border bg-white p-4">
        <Button className="m-0 p-0">Save</Button>
      </section>
    </main>
  );
}
