import { getUser } from "@/lib/auth";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import DeleteProfilePicture from "./_components/DeleteProfilePicture";
import ProfileForm from "./_components/ProfileForm";
import UploadWidget from "./_components/UploadWidget";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>
          Add your details to create a personal touch to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <div className="px-6 lg:px-10">
          <section className="flex flex-col gap-4 rounded-lg bg-lightGray p-5 md:flex-row md:items-center md:justify-between">
            <header>
              <h2 className="body-m text-gray">Profile Picture</h2>
            </header>
            <div className="space-y-4 md:flex md:w-[60%] md:items-center md:gap-6">
              <UploadWidget user={user} />
              <div>
                <p className="body-s text-gray ">
                  Image must be below 1024x1024px. Use PNG or JPG format.
                </p>
                {user.profilePictureUrl && (
                  <DeleteProfilePicture userId={user.id} />
                )}
              </div>
            </div>
          </section>
        </div>
        <ProfileForm user={user} />
      </CardContent>
    </>
  );
}
