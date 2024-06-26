"use client";
import { updateProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LabelInput from "@/components/ui/LabelInput";
import LogoutButton from "@/components/ui/LogoutButton";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucia";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type Props = {
  user: User;
};

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "Required"),
  lastName: z.string().trim().min(1, "Required"),
  email: z.string().email().trim().min(1, "Required"),
});

type ProfileSchemaType = z.infer<typeof profileSchema>;

export default function ProfileForm({ user }: Props) {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = form;

  async function onSubmit(values: ProfileSchemaType) {
    const { firstName, lastName, email } = values;
    const res = await updateProfile(firstName, lastName, email, user.id);
    if (!res.error) {
      toast("Update successful", { type: "success" });
    } else {
      toast(res.error, { type: "error" });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-8"
        >
          <div className="max-h-[70%] px-6 lg:px-10">
            <section className="space-y-3 rounded-lg bg-lightGray p-5">
              <LabelInput
                label="First name*"
                placeholder="Enter first name"
                value="firstName"
                type="text"
                halfOnTablet
              />
              <LabelInput
                label="Last name*"
                placeholder="Enter last name"
                value="lastName"
                type="text"
                halfOnTablet
              />
              <LabelInput
                label="Email"
                placeholder="Enter email"
                value="email"
                type="email"
                halfOnTablet
              />
            </section>
          </div>
          <section className="justify-self-end rounded-b-lg border-t border-border  py-4 ">
            <div
              className={cn(
                "flex w-full gap-4 px-6",
                " md:flex-row md:justify-end",
                " lg:px-10",
              )}
            >
              <LogoutButton />
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="m-0 p-0 md:w-[91px]"
              >
                Save
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </>
  );
}
