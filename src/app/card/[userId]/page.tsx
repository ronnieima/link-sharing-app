import LinkInfoLoader from "@/components/ui/LinkInfoLoader";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  params: { userId: string };
};

export default function UserCardPage({ params }: Props) {
  return (
    <main className="relative min-h-screen items-center justify-stretch bg-white md:flex">
      <div className="absolute top-0 z-10 hidden h-[357px] w-full rounded-b-[32px] bg-purple md:block"></div>
      <div className="z-20 flex flex-col items-center justify-center rounded-3xl bg-white py-12 md:mx-auto md:h-full md:min-w-[349px] md:shadow-lg">
        <Suspense fallback={<Skeleton className="rounded-lg" count={5} />}>
          <LinkInfoLoader userId={params.userId} />
        </Suspense>
      </div>
    </main>
  );
}
