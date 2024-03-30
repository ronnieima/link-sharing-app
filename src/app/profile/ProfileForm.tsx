"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form>ProfileForm</form>
    </Form>
  );
}
