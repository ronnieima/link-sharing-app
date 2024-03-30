"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LabelInput from "@/components/ui/LabelInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerUser } from "@/actions/registerUser";
import { registerFormSchema, RegisterFormSchemaType } from "@/lib/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const { handleSubmit } = form;

  async function onSubmit(values: RegisterFormSchemaType) {
    const res = await registerUser(values.email, values.password);
    if (res?.error) {
      setError(res?.error);
    } else {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-10 md:w-[476px] md:rounded-lg md:bg-white md:p-10 md:shadow-sm"
      >
        <header className="space-y-2">
          <h1 className="heading-m">Create account</h1>
          <p className="body-m">Let’s get you started sharing your links!</p>
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
          <p className="body-s text-gray">
            Password must contain at least 8 characters
          </p>
          <Button type="submit" variant={"default"}>
            Create new account
          </Button>
        </div>
        <footer className="body-m flex w-full flex-col items-center justify-center md:flex-row md:gap-1">
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
