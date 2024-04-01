import { getLinks } from "@/actions/link";
import { validateRequest } from "@/lib/auth";
import LinkForm from "./_components/LinkForm";
import { redirect } from "next/navigation";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function CustomizePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const links = await getLinks(user.id);

  return (
    <>
      <CardHeader>
        <CardTitle className="heading-m">Customize your link</CardTitle>
        <CardDescription className="body-m">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </CardDescription>
        {links.error && <span className="text-xs text-red">{links.error}</span>}
      </CardHeader>
      <CardContent className="h-full">
        <LinkForm links={links?.data} userId={user.id} />
      </CardContent>
    </>
  );
}
