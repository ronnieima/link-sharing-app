"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Label } from "./label";

type Props = {
  label: string;
  value: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  icon: string;
};

export default function LabelInput({ label, value, type, placeholder }: Props) {
  const { control } = useFormContext();
  return (
    <FormField
      name={value}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-body-s">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input type={type} placeholder={placeholder} {...field} />
              <FormMessage className="text-body-s absolute right-4 top-1/2 -translate-y-1/2 font-thin text-red" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
