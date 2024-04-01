import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeleteProfilePicture from "./_components/DeleteProfilePicture";
import ProfileForm from "./_components/ProfileForm";
import UploadWidget from "./_components/UploadWidget";

export default async function ProfilePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="heading-m">Profile Details</CardTitle>
        <CardDescription className="body-m">
          Add your details to create a personal touch to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full space-y-4">
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
        <ProfileForm user={user} />
      </CardContent>
      {/* <header className="pb-10">
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
          <div className="space-y-4 md:flex md:w-1/2 md:items-center md:gap-6">
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
        <ProfileForm user={user} />
      </div> */}
    </>
  );
}
