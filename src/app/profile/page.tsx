import MaxWidthContainer from "@/components/MaxWidthContainer";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import ProfileForm from "./ProfileForm";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/ui/LogoutButton";
import Preview from "../customize/Preview";
import { cn } from "@/lib/utils";
import UploadWidget from "./UploadWidget";

export default async function ProfilePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <main
      className={cn(
        "p-4",
        "md:p-6",
        "lg:flex  lg:items-stretch lg:justify-center lg:gap-6 lg:pt-0",
      )}
    >
      <Preview />
      <div className="relative flex flex-col gap-10 rounded-lg bg-white p-6 md:h-[779px] md:p-10">
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
              {/* <div className="flex aspect-square h-[193px] flex-col items-center justify-center rounded-lg bg-lightPurple ">
                <img src="images/icon-upload-image.svg" alt="upload image" />
                <Button variant={"link"}>
                  <p className="heading-s text-purple">+ Upload Image</p>
                </Button>
              </div> */}
              <UploadWidget userId={user.id} />
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
