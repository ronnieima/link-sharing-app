"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LabelInput from "@/components/ui/LabelInput";
import LogoutButton from "@/components/ui/LogoutButton";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  email: string;
};

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "Required"),
  lastName: z.string().trim().min(1, "Required"),
  email: z.string().email().trim().min(1, "Required"),
});

type ProfileSchemaType = z.infer<typeof profileSchema>;

export default function ProfileForm({ email }: Props) {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email,
    },
  });
  const { handleSubmit } = form;

  async function onSubmit(values: ProfileSchemaType) {
    console.log(values);
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
        <section className=" space-y-4 rounded-b-lg border-t border-border bg-white p-4">
          <LogoutButton />
          <Button type="submit" className="m-0 p-0">
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
}
