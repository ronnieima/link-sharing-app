import { cn } from "@/lib/utils";
import AuthedNavbar from "./_components/AuthedNavbar";
import Preview from "./customize/_components/Preview";
import { getLinks } from "@/actions/link";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import CardContainer from "./_components/CardContainer";

export default async function AuthedLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const links = await getLinks(user.id);
  return (
    <section>
      <AuthedNavbar />
      <main
        className={cn(
          "h-[calc(100svh-126px)]  p-4",
          "md:p-6 md:pt-0",
          "flex w-full  flex-row lg:gap-6 ",
        )}
      >
        <Preview user={user} links={links.data} />
        <CardContainer>{children}</CardContainer>
      </main>
    </section>
  );
}
