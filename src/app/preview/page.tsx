import LinkInfoLoader from "@/components/ui/LinkInfoLoader";

import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function PreviewPage() {
  return (
    <main className=" ">
      <div className="absolute top-0 -z-10 hidden h-[357px] w-full rounded-b-[32px] bg-purple md:block"></div>
      <div className="flex h-screen  flex-col items-center justify-center rounded-3xl bg-white py-12 md:mx-auto md:h-full md:max-w-[349px] md:shadow-lg">
        <Suspense fallback={<Skeleton className="rounded-lg" count={5} />}>
          <LinkInfoLoader />
        </Suspense>
      </div>
    </main>
  );
}
