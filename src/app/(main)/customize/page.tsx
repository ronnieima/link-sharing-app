import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinkFormLoader from "./_components/LinkFormLoader";
import { Suspense } from "react";

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
      <CardContent className="h-full">
        <Suspense fallback={<h4 className="text-4xl">green fn</h4>}>
          <LinkFormLoader />
        </Suspense>
      </CardContent>
    </>
  );
}
