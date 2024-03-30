"use client";

import { Button } from "@/components/ui/button";
import LabelInput from "@/components/ui/LabelInput";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { loginUser } from "../actions";

const loginFormSchema = z.object({
  email: z.string({ required_error: "Can't be empty" }).email().trim().min(1),
  password: z.string({ required_error: "Please check again" }).min(1),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const { handleSubmit } = form;

  async function onSubmit(values: LoginFormSchemaType) {
    const { email, password } = values;
    await loginUser(email, password);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-10 md:w-[476px] md:rounded-lg md:bg-white md:p-10 md:shadow-sm"
      >
        <header className="space-y-2">
          <h1 className="text-heading-m">Login</h1>
          <p className="text-body-m">
            Add your details below to get back into the app
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
            label="Password"
            value="password"
            type="password"
            placeholder="Enter your password"
            icon="/images/icon-password.svg"
          />
          <Button variant={"default"}>Login</Button>
        </div>
        <footer className="text-body-m flex w-full flex-col items-center justify-center md:flex-row md:gap-1">
          <p>Don&apos;t have an account?</p>
          <Link
            className="text-purple transition-colors  hover:text-purpleHover"
            href={"/register"}
          >
            Create account
          </Link>
        </footer>
      </form>
    </Form>
  );
}
