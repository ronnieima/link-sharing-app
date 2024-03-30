"use client";
import { Form } from "@/components/ui/form";
import { LinkType } from "@/lib/db/schema";
import { useForm } from "react-hook-form";
import PreviewItem from "./PreviewItem";

type Props = {
  links: LinkType[];
};

export default function LinkForm({ links }: Props) {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="flex flex-col gap-8 rounded-lg  p-5 text-center">
        {links.map((link, index) => {
          return <PreviewItem key={link.id} link={link} index={index} />;
        })}
      </form>
    </Form>
  );
}
