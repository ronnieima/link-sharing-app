"use client";
import { Form } from "@/components/ui/form";
import LabelInput from "@/components/ui/LabelInput";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-3">
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
      </form>
    </Form>
  );
}
