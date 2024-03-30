"use client";
import { Form } from "@/components/ui/form";
import { LinkType } from "@/lib/db/schema";
import { DevTool } from "@hookform/devtools";
import { useFieldArray, useForm } from "react-hook-form";
import PreviewItem from "./PreviewItem";
import { toast } from "react-toastify";
import EmptyLinks from "./EmptyLinks";
import { updateLinks } from "@/actions/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
const MAX_LINKS_AMOUNT = 5;
type Props = {
  links?: LinkType[];
  userId: string;
};

export default function LinkForm({ links, userId }: Props) {
  const defaultLinks =
    Object.entries(links).flatMap((link) => ({
      platform: link[1].platform,
      url: link[1].url,
    })) || [];
  const form = useForm({
    defaultValues: {
      links: defaultLinks,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitSuccessful },
    reset,
  } = form;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "links",
    },
  );

  async function onSubmit(values: {
    links: { platform: string; url: string }[];
  }) {
    const res = await updateLinks(values, userId);

    if (res.error) {
      return toast(`Failed to update: ${res.error}`, { type: "error" });
    } else {
      reset({}, { keepValues: true });
      return toast("Successfully updated", { type: "success" });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 rounded-lg  p-5 text-center"
      >
        <Button
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            if (fields.length < MAX_LINKS_AMOUNT) {
              append({ platform: "github", url: "" });
            } else if (fields.length >= MAX_LINKS_AMOUNT) {
              toast(`Maximum number of links reached (${MAX_LINKS_AMOUNT})`, {
                type: "error",
              });
            }
          }}
        >
          + Add new link
        </Button>
        {fields.length === 0 ? (
          <EmptyLinks />
        ) : (
          <ul>
            {fields.map((field, index) => {
              return (
                <PreviewItem
                  key={field.id}
                  link={field}
                  index={index}
                  remove={remove}
                />
              );
            })}
            {/* <DevTool control={form.control} /> */}
          </ul>
        )}
        <section className="rounded-b-lg border-t border-border bg-white p-4">
          <Button type="submit" className="m-0 p-0" disabled={!isDirty}>
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
}
