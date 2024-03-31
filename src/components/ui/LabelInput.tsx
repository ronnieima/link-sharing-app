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
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  icon?: string;
  defaultValue?: string;
  halfOnTablet?: boolean;
};

export default function LabelInput({
  label,
  value,
  type,
  placeholder,
  icon,
  halfOnTablet = false,
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      name={value}
      control={control}
      render={({ field }) => (
        <FormItem
          className={cn({
            "md:flex md:flex-row md:items-center md:justify-between":
              halfOnTablet,
          })}
        >
          <FormLabel className="body-s">{label}</FormLabel>
          <FormControl className={cn("peer", { "md:w-1/2": halfOnTablet })}>
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
