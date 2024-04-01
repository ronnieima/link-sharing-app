import { getLinks } from "@/actions/link";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import LinkForm from "./LinkForm";
import Preview from "./Preview";
import { Button } from "@/components/ui/button";

export default async function CustomizePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const links = await getLinks(user.id);

  return (
    <>
      <Preview user={user} links={links.data} />
      <div className="relative h-full w-full rounded-lg bg-white p-6  lg:w-2/3  lg:p-10">
        <header className="">
          <h1 className="heading-m">Customize your links</h1>
          <p className="body-m">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          {links.error && (
            <span className="text-xs text-red">{links.error}</span>
          )}
        </header>

        <LinkForm links={links?.data} userId={user.id} />
      </div>
    </>
  );
}
