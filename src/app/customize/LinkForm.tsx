"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LinkType } from "@/lib/db/schema";
import { DevTool } from "@hookform/devtools";
import { useFieldArray, useForm } from "react-hook-form";
import PreviewItem from "./PreviewItem";
import { toast } from "react-toastify";
import EmptyLinks from "./EmptyLinks";
const MAX_LINKS_AMOUNT = 5;
type Props = {
  links: LinkType[];
};

export default function LinkForm({ links }: Props) {
  const defaultLinks = Object.entries(links).flatMap((link) => ({
    platform: link[1].platform,
    url: link[1].url,
  }));
  const form = useForm({
    defaultValues: {
      links: defaultLinks,
    },
  });

  const { control } = form;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "links",
    },
  );

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8 rounded-lg  p-5 text-center">
        <Button
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
          <>
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
            <section className="rounded-b-lg border-t border-border bg-white p-4">
              <Button
                type="submit"
                onClick={(e) => e.preventDefault()}
                className="m-0 p-0"
              >
                Save
              </Button>
            </section>
          </>
        )}
      </form>
    </Form>
  );
}
