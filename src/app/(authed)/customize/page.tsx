import { getLinks } from "@/actions/link";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import LinkForm from "./LinkForm";
import Preview from "./Preview";

export default async function CustomizePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const links = await getLinks(user.id);

  return (
    <main
      className={cn(
        "p-4",
        "md:p-6",
        "lg:flex  lg:items-stretch lg:justify-center lg:gap-6 lg:pt-0",
      )}
    >
      <Preview user={user} links={links.data} />
      <div className="relative rounded-lg bg-white p-6 shadow-sm lg:w-2/3 lg:p-10">
        <header className="pb-10">
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
    </main>
  );
}
