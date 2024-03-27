"use client";

import { Button } from "@/components/ui/button";
import LabelInput from "@/components/ui/LabelInput";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const registerFormSchema = z
  .object({
    email: z.string({ required_error: "Can't be empty" }).email().trim().min(1),
    password: z
      .string({ required_error: "Please check again" })
      .min(8, "At least 8 characters"),
    confirm: z
      .string({ required_error: "Please check again" })
      .min(8, "At least 8 characters"),
  })
  .refine((values) => values.password === values.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const { handleSubmit } = form;

  function onSubmit() {}

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-10 md:w-[476px] md:rounded-lg md:bg-white md:p-10 md:shadow-sm"
      >
        <header className="space-y-2">
          <h1 className="text-heading-m">Create account</h1>
          <p className="text-body-m">
            Let’s get you started sharing your links!
          </p>
        </header>
        <div className="space-y-6">
          <LabelInput
            label="Email address"
            value="email"
            type="email"
            placeholder="e.g. alex@email.com"
            icon="/images/icon-email.svg"
          />
          <LabelInput
            label="Create password"
            value="password"
            type="password"
            placeholder="At least 8 characters"
            icon="/images/icon-password.svg"
          />
          <LabelInput
            label="Confirm Password"
            value="confirm"
            type="password"
            placeholder="At least 8 characters"
            icon="/images/icon-password.svg"
          />
          <p className="text-body-s text-gray">
            Password must contain at least 8 characters
          </p>
          <Button variant={"default"}>Create new account</Button>
        </div>
        <footer className="text-body-m flex w-full flex-col items-center justify-center md:flex-row md:gap-1">
          <p>Already have an account?</p>
          <Link
            className="text-purple transition-colors  hover:text-purpleHover"
            href={"/login"}
          >
            Login
          </Link>
        </footer>
      </form>
    </Form>
  );
}
