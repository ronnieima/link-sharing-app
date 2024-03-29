"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlatformKeys, platforms, useLinkStore } from "@/stores/useLinkStore";
import { Grip, Link } from "lucide-react";
import { useFormContext } from "react-hook-form";
type Props = {
  platform: string;
  index: number;
};

export default function PreviewItem({ index }: Props) {
  const handleRemoveLink = useLinkStore((state) => state.handleRemoveLink);

  const { control, watch } = useFormContext();
  const currPlatform =
    platforms[watch(index.toString()) as PlatformKeys] || platforms.github;
  return (
    <div className="flex w-full flex-col  gap-3 rounded-lg bg-lightGray p-5  text-center">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Grip size={16} /> <p>Link #{index + 1}</p>
        </div>
        <Button
          variant={"link"}
          className="m-0 block w-16 p-0"
          onClick={() => handleRemoveLink(index)}
        >
          Remove
        </Button>
      </div>
      <FormField
        name={index.toString()}
        control={control}
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel>Platform</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <img src={currPlatform.icon} alt="logo" />
                    <SelectValue className="text-left" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(platforms).map((platform) => (
                    <SelectItem
                      value={platform}
                      key={platform}
                      icon={platforms[platform as PlatformKeys].icon}
                    >
                      <span>
                        {platforms[platform as PlatformKeys].platform}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name={`${currPlatform.value}Link`}
        control={control}
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel>Link</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="text"
                  icon={<Link />}
                  alt={`${currPlatform.platform} icon`}
                  placeholder={`e.g. ${currPlatform.link}johnappleseed`}
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
