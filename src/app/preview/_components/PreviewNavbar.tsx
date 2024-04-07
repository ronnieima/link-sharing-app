import NavbarContainer from "@/components/NavbarContainer";
import { buttonVariants } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ShareLinkButton from "./ShareLinkButton";
import { redirect } from "next/navigation";

export default async function PreviewNavbar() {
  const user = await getUser();
  if (!user) redirect("/login");
  return (
    <NavbarContainer className="gap-4">
      <Link
        href="/customize"
        className={cn(
          "md:w-[159px] lg:w-[133px]",
          buttonVariants({ variant: "outline" }),
        )}
      >
        Back to Editor
      </Link>
      <ShareLinkButton userId={user?.id} />
    </NavbarContainer>
  );
}
