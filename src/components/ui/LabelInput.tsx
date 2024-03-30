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
  icon?: string;
};

export default function LabelInput({
  label,
  value,
  type,
  placeholder,
  icon,
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      name={value}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="body-s">{label}</FormLabel>
          <FormControl className="peer">
            <div className="group relative aria-invalid:border-red ">
              <Input
                icon={icon}
                type={type}
                placeholder={placeholder}
                className="group-aria-invalid:border group-aria-invalid:border-red"
                {...field}
              />
              <FormMessage className="body-s absolute right-4 top-1/2 hidden -translate-y-1/2 font-thin text-red md:block" />
            </div>
          </FormControl>
          <FormMessage className="peer-aria-invalid:text-red md:hidden" />
        </FormItem>
      )}
    />
  );
}
