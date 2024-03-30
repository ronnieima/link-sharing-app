"use client";
import { updateProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LabelInput from "@/components/ui/LabelInput";
import LogoutButton from "@/components/ui/LogoutButton";
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <LabelInput
          label="First name*"
          placeholder="Enter first name"
          value="firstName"
          type="text"
        />
        <LabelInput
          label="Last name*"
          placeholder="Enter last name"
          value="lastName"
          type="text"
        />
        <LabelInput
          label="Email"
          placeholder="Enter email"
          value="email"
          type="email"
        />
        <section className="flex w-full flex-col items-center gap-4 rounded-b-lg border-t border-border bg-white p-4 md:flex-row md:justify-end">
          <LogoutButton />
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="m-0 p-0 md:w-[91px]"
          >
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
}
