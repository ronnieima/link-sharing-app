"use client";
import { addProfilePictureUrl } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "lucia";
import { ImageIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";

type Props = {
  user: User;
};

export default function UploadWidget({ user }: Props) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        maxFiles: 1,
        multiple: false,
        sources: ["local", "url"],
        publicId: user?.id,
        maxImageHeight: 1024,
        maxImageWidth: 1024,
      }}
      onSuccess={(results) => {
        //@ts-ignore
        addProfilePictureUrl(user?.id, results.info.url);
        toast(`Image uploaded successfully!`, {
          type: "success",
        });
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className={cn(
              `flex aspect-square h-[193px] flex-col items-center justify-center space-y-2 rounded-lg bg-lightPurple hover:cursor-pointer`,
            )}
            style={
              user?.profilePictureUrl
                ? {
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ),url(${user?.profilePictureUrl})`,
                    backgroundSize: `cover`,
                  }
                : {}
            }
          >
            <ImageIcon
              className={cn("w-16", {
                "text-white": user?.profilePictureUrl,
              })}
            />
            <p
              className={cn("heading-s text-purple", {
                "text-white ": user?.profilePictureUrl,
              })}
            >
              {user?.profilePictureUrl ? "Change Image" : "Upload Image"}
            </p>
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
