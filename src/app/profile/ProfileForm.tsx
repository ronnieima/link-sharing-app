"use client";
import { Form } from "@/components/ui/form";
import LabelInput from "@/components/ui/LabelInput";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form>
        <LabelInput
          label="First name*"
          placeholder="Enter first name"
          value="firstName"
          type="text"
        />
      </form>
    </Form>
  );
}
