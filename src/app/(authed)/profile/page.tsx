import { getLinks } from "@/actions/link";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import Preview from "../customize/Preview";
import ProfileForm from "./ProfileForm";
import UploadWidget from "./UploadWidget";

export default async function ProfilePage() {
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
        <header>
          <h1 className="heading-m">Profile Details</h1>
          <p className="body-m text-gray">
            Add your details to create a personal touch to your profile.
          </p>
        </header>
        <div className="space-y-4">
          <section className="flex flex-col gap-4 rounded-lg bg-lightGray p-5 md:flex-row md:items-center md:justify-between">
            <header>
              <h2 className="body-m text-gray">Profile Picture</h2>
            </header>
            <div className="md:flex md:w-1/2 md:items-center md:gap-6">
              <UploadWidget user={user} />
              <p className="body-s text-gray ">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </section>
          <ProfileForm user={user} />
        </div>
      </div>
    </main>
  );
}
