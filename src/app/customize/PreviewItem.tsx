"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Grip, LinkIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { PlatformKeys, platforms } from "../../stores/useLinkStore";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LinkType } from "@/lib/db/schema";
import { removeLink, updateLink } from "../actions";
type Props = {
  link: LinkType;
  index: number;
};

export default function PreviewItem({ link, index }: Props) {
  const { control } = useFormContext();

  const selectPlatformObj = platforms[link.platform as PlatformKeys];

  return (
    <div className="flex w-full flex-col  gap-3 rounded-lg bg-lightGray p-5  text-center">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Grip size={16} /> <p>Link #{index + 1}</p>
        </div>
        <Button
          variant={"link"}
          className="m-0 block w-16 p-0"
          onClick={async (e) => {
            e.preventDefault();
            await removeLink(link.id);
          }}
        >
          Remove
        </Button>
      </div>
      <FormField
        name={`${link.id}Platform`}
        control={control}
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel>Platform</FormLabel>
            <FormControl>
              <Select
                onValueChange={async (newPlatform) =>
                  await updateLink(link.id, newPlatform)
                }
                defaultValue={link.platform}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <img src={selectPlatformObj.icon} alt="logo" />
                    <SelectValue className="text-left" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(platforms).map((platform) => {
                    const platformObj = platforms[platform as PlatformKeys];
                    return (
                      <SelectItem
                        value={platform}
                        key={platform}
                        icon={platformObj.icon}
                      >
                        <span>{platformObj.platform}</span>
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
        name={`${link.id}Link`}
        control={control}
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel>Link</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="text"
                  icon={<LinkIcon />}
                  defaultValue={link.url}
                  alt={`${selectPlatformObj.platform} icon`}
                  placeholder={`e.g. ${selectPlatformObj.link}johnappleseed`}
                  className="pl-8"
                  {...field}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
