"use client";
import { Form } from "@/components/ui/form";
import { LinkType } from "@/lib/db/schema";
import { useFieldArray, useForm } from "react-hook-form";
import LinkItem from "./LinkItem";
import { toast } from "react-toastify";
import EmptyLinks from "./EmptyLinks";
import { updateLinks } from "@/actions/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const MAX_LINKS_AMOUNT = 5;
type Props = {
  links?: LinkType[];
  userId: string;
};

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
    <>
      <Form {...form}>
        <form
          id="linkForm"
          onSubmit={handleSubmit(onSubmit)}
          className={cn("h-full gap-8  rounded-lg pt-8 text-center")}
        >
          <div className=" flex max-h-[66%] flex-col gap-6 px-6 pb-6 lg:px-10">
            <Button
              variant={"outline"}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (fields.length < MAX_LINKS_AMOUNT) {
                  append({
                    platform: "github",
                    url: "https://www.github.com/",
                  });
                } else if (fields.length >= MAX_LINKS_AMOUNT) {
                  toast(
                    `Maximum number of links reached (${MAX_LINKS_AMOUNT})`,
                    {
                      type: "error",
                    },
                  );
                }
              }}
            >
              + Add new link
            </Button>
            <ul className="flex flex-col gap-6 overflow-y-auto">
              {fields.length === 0 ? (
                <EmptyLinks />
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
          <section className="h-[25%] justify-self-end rounded-b-lg border-t border-border  py-4   ">
            <div
              className={cn(
                "flex w-full px-6",
                " md:flex-row md:justify-end",
                " lg:px-10",
              )}
            >
              <Button
                form="linkForm"
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="m-0 p-0 md:w-[91px]"
              >
                Save
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </>
  );
}
