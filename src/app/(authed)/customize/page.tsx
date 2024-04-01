import { getLinks } from "@/actions/link";
import { validateRequest } from "@/lib/auth";
import LinkForm from "./_components/LinkForm";
import { redirect } from "next/navigation";

export default async function CustomizePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const links = await getLinks(user.id);

  return (
    <>
      <header className="">
        <h1 className="heading-m">Customize your links</h1>
        <p className="body-m">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        {links.error && <span className="text-xs text-red">{links.error}</span>}
      </header>

      <LinkForm links={links?.data} userId={user.id} />
    </>
  );
}
