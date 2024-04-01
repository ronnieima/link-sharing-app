"use client";

import { Button } from "@/components/ui/button";
import LabelInput from "@/components/ui/LabelInput";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { loginUser } from "@/actions/auth";
import { Info, TestTubeDiagonal } from "lucide-react";
import DemoInfoPopover from "./DemoInfoPopover";

const loginFormSchema = z.object({
  email: z.string({ required_error: "Can't be empty" }).email().trim().min(1),
  password: z.string({ required_error: "Please check again" }).min(1),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [error, setError] = useState("");
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const { handleSubmit } = form;

  async function onSubmit(values: LoginFormSchemaType) {
    const { email, password } = values;
    const res = await loginUser(email, password);
    if (res?.error) {
      setError(res?.error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-10 md:w-[476px] md:rounded-lg md:bg-white md:p-10 md:shadow-sm"
      >
        <header className="space-y-2">
          <div className="flex w-full items-center gap-2">
            <h1 className="heading-m">Login</h1>
            <DemoInfoPopover />
          </div>
          <p className="body-m">
            Add your details below to get back into the app
          </p>
          {error && <span className="text-xs text-red">{error}</span>}
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
        <footer className="body-m flex w-full flex-col items-center justify-center md:flex-row md:gap-1">
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
