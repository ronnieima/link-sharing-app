"use client";
import { Form } from "@/components/ui/form";
import { LinkType } from "@/lib/db/schema";
import { useFieldArray, useForm } from "react-hook-form";
import LinkItem from "./LinkItem";
import { toast } from "react-toastify";
import EmptyLinks from "./EmptyLinks";
import { updateLinks } from "@/actions/link";
import { Button } from "@/components/ui/button";
import { Github, LinkedinIcon, Youtube } from "lucide-react";
const MAX_LINKS_AMOUNT = 5;
type Props = {
  links?: LinkType[];
  userId: string;
};

export const platforms = [
  {
    platform: "GitHub",
    value: "github",
    link: "github.com",
    icon: <Github />,
    color: "#1A1A1A",
  },
  {
    platform: "Youtube",
    value: "youtube",
    link: "youtube.com",
    icon: <Youtube />,
    color: "#EE3939",
  },
  {
    platform: "LinkedIn",
    value: "linkedin",
    link: "linkedin.com",
    icon: <LinkedinIcon />,
    color: "#2D68FF",
  },
];

export default function LinkForm({ links, userId }: Props) {
  const defaultLinks =
    Object.entries(links!).flatMap((link) => ({
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
    formState: { isDirty, isSubmitting },
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
        className="flex flex-col gap-8  rounded-lg  p-5 text-center lg:p-0"
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
          <ul className="space-y-6 pb-16">
            {fields.map((field, index) => {
              return (
                <LinkItem
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
        <section className="md: flex w-full flex-col items-center gap-4 rounded-b-lg border-t border-border bg-white p-4 md:bottom-0 md:right-0 md:flex-row md:justify-end md:p-6">
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="m-0 p-0 md:w-[91px]"
          >
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
}
