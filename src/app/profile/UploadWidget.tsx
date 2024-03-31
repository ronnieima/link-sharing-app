"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  userId: string;
};

export default function UploadWidget({ userId }: Props) {
  const url = getCldImageUrl({
    width: 200,
    height: 200,
    src: `devlinks/${userId}`,
    defaultImage: "no-image.jpg",
  });

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        maxFiles: 1,
        multiple: false,
        sources: ["local", "url"],
        publicId: userId,
      }}
      onSuccess={() => {
        toast(`Image uploaded successfully!`, {
          type: "success",
        });
      }}
    >
      {({ open }) => {
        return (
          <div
            style={
              url
                ? {
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${url})`,
                    backgroundSize: `cover`,
                  }
                : {}
            }
            className={cn(
              `flex aspect-square h-[193px] flex-col items-center justify-center rounded-lg bg-lightPurple`,
            )}
          >
            <img src="images/icon-upload-image.svg" alt="upload image" />
            <Button variant={"link"} onClick={() => open()}>
              <p
                className={cn("heading-s text-purple", {
                  "text-white": url,
                })}
              >
                {" "}
                Upload Image
              </p>
            </Button>
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
