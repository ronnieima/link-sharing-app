import React from "react";
import { Label } from "./label";
import { Input } from "./input";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  icon: string;
};

export default function LabelInput({ label, type, placeholder }: Props) {
  return (
    <div className="">
      <Label className="text-body-s">{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
}
