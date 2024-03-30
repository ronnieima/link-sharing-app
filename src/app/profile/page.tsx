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
    <main>
      <MaxWidthContainer>
        <header>
          <h1>Profile Details</h1>
          <p>Add your details to create a personal touch to your profile.</p>
        </header>
        <section>
          <h2>Profile Picture</h2>
          <div className="flex aspect-square h-[193px] flex-col items-center justify-center rounded-lg bg-lightPurple">
            <img src="images/icon-upload-image.svg" alt="upload image" />
            <Button variant={"link"}>
              <p className="heading-s text-purple">+ Upload Image</p>
            </Button>
          </div>
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </section>
        <section>
          <ProfileForm />
        </section>
      </MaxWidthContainer>
    </main>
  );
}
