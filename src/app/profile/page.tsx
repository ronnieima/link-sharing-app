import MaxWidthContainer from "@/components/MaxWidthContainer";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import ProfileForm from "./ProfileForm";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <main className="p-4 ">
      <MaxWidthContainer className="flex flex-col gap-10 rounded-lg bg-white p-6">
        <header>
          <h1 className="heading-m">Profile Details</h1>
          <p className="body-m text-gray">
            Add your details to create a personal touch to your profile.
          </p>
        </header>
        <div className="space-y-4">
          <section className="space-y-4 rounded-lg bg-lightGray p-5">
            <h2 className="body-m text-gray">Profile Picture</h2>
            <div className="flex aspect-square h-[193px] flex-col items-center justify-center rounded-lg bg-lightPurple">
              <img src="images/icon-upload-image.svg" alt="upload image" />
              <Button variant={"link"}>
                <p className="heading-s text-purple">+ Upload Image</p>
              </Button>
            </div>
            <p className="body-s text-gray">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </section>
          <section className="rounded-lg bg-lightGray p-5">
            <ProfileForm />
          </section>
        </div>
      </MaxWidthContainer>
      <section className="rounded-b-lg border-t border-border bg-white p-4">
        <Button className="m-0 p-0">Save</Button>
      </section>
    </main>
  );
}
