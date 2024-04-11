import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinkFormLoader from "./_components/LinkFormLoader";
import { Suspense } from "react";
import LinkFormLoadingSkeleton from "./_components/LinkFormLoadingSkeleton";

export default function CustomizePage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Customize your links</CardTitle>
        <CardDescription>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LinkFormLoadingSkeleton />}>
          <LinkFormLoader />
        </Suspense>
      </CardContent>
    </>
  );
}
