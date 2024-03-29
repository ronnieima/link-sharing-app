import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Grip, Link } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  Platform,
  PlatformKeys,
  platforms,
  useLinkStore,
} from "../../stores/useLinkStore";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
  index: number;
};

export default function PreviewItem({ index }: Props) {
  const decCounter = useLinkStore((state) => state.decCounter);

  const { control, watch } = useFormContext();

  const selectedPlatformValue: PlatformKeys =
    watch(index.toString()) || "github";

  const selectPlatformObj = platforms[selectedPlatformValue];

  return (
    <div className="flex w-full flex-col  gap-3 rounded-lg bg-lightGray p-5  text-center">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Grip size={16} /> <p>Link #{index + 1}</p>
        </div>
        <Button
          variant={"link"}
          className="m-0 block w-16 p-0"
          onClick={decCounter}
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
        name={`${index.toString()}Link`}
        control={control}
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel>Link</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="text"
                  icon={<Link />}
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
