import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import Links from "./Links";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function CustomizePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <main className="p-4">
      <section className="">
        <MaxWidthContainer className="rounded-t-lg bg-white p-6 shadow-sm lg:p-10">
          <header className="pb-10">
            <h1 className="text-heading-m">Customize your links</h1>
            <p className="text-body-m">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
            <span>User id: {user.id}</span>
            <LogoutButton />
          </header>

          <Links />
        </MaxWidthContainer>
        <div className="flex justify-end rounded-b-lg border-t border-border/80 bg-white px-10 py-6">
          <Button className="w-[91px]">Save</Button>
        </div>
      </section>
    </main>
  );
}
