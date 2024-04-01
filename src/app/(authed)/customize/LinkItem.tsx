"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Grip, LinkIcon } from "lucide-react";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cloneElement, useEffect, useState } from "react";
import { platforms } from "./LinkForm";
type Props = {
  link: FieldArrayWithId<
    {
      links: {
        platform: string;
        url: string;
      }[];
    },
    "links",
    "id"
  >;
  index: number;
  remove: UseFieldArrayRemove;
};

export default function LinkItem({ link, index, remove }: Props) {
  const { control, watch, setValue } = useFormContext();
  const [currentPlatform, setCurrentPlatform] = useState(link.platform);
  const selectedPlatform = watch(`links.${index}.platform`);

  useEffect(() => {
    setCurrentPlatform(selectedPlatform);
  }, [selectedPlatform, index, setValue]);
  const selectPlatformObj = platforms.find(
    (platformMeta) => platformMeta.value === currentPlatform,
  );

  const rootDomain = selectPlatformObj?.link || "";
  const regexPattern = `^https://www\\.${rootDomain.replace(/\./g, "\\.")}\\/.+$`;

  const regex = new RegExp(regexPattern);

  return (
    <div className="flex w-full flex-col  gap-3 rounded-lg bg-lightGray p-5  text-center">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Grip size={16} />{" "}
          <p className="heading-s text-gray">Link #{index + 1}</p>
        </div>
        <Button
          variant={"link"}
          className="m-0 block w-16 p-0"
          onClick={async (e) => {
            e.preventDefault();
            remove(index);
          }}
        >
          Remove
        </Button>
      </div>
      <FormField
        name={`links.${index}.platform` as const}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel>Platform</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  setValue(`links.${index}.url`, "");
                  field.onChange(value);
                }}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    {cloneElement(selectPlatformObj?.icon!, {
                      className: "size-4",
                    })}
                    <SelectValue className="text-left" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => {
                    return (
                      <SelectItem
                        value={platform.value}
                        key={platform.value}
                        icon={cloneElement(platform?.icon, {
                          className: "size-4",
                        })}
                      >
                        <span>{platform?.platform}</span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name={`links.${index}.url` as const}
        control={control}
        rules={{
          required: { value: true, message: "Required" },
          pattern: {
            value: regex,
            message: "Invalid URL",
          },
        }}
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel>Link</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="text"
                  icon={<LinkIcon />}
                  alt={`${selectPlatformObj?.platform} icon`}
                  placeholder={`e.g. https://www.${selectPlatformObj?.link}/johnappleseed`}
                  className="pl-8"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage className="text-red" />
          </FormItem>
        )}
      />
    </div>
  );
}
