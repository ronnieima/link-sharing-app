import { getLinks } from "@/actions/link";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
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
      <div className="rounded-t-lg bg-white p-6 shadow-sm lg:p-10">
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

        <LinkForm links={links?.data} userId={user.id} />
      </div>
    </main>
  );
}
