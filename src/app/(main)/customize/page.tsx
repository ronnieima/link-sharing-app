import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinkFormLoader from "./_components/LinkFormLoader";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

export default function CustomizePage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="heading-m">Customize your link</CardTitle>
        <CardDescription className="body-m">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Suspense
          fallback={
            <div className="flex flex-col gap-6 py-8">
              <Skeleton className="h-10 w-full  rounded-lg" />
              <Skeleton height={248} count={3} className="w-full rounded-lg" />
            </div>
          }
        >
          <LinkFormLoader />
        </Suspense>
      </CardContent>
    </>
  );
}
