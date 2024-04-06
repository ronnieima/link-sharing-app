import LinkInfoLoader from "@/components/ui/LinkInfoLoader";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function Preview() {
  return (
    <section className="hidden lg:flex lg:min-w-[560px] lg:items-center lg:justify-center lg:rounded-lg lg:bg-white">
      <div
        className={cn(
          "h-full max-h-[631px] w-full max-w-[307px] gap-5 pt-16",
          "bg-phonePreview bg-contain bg-no-repeat",
          "flex flex-col items-center",
        )}
      >
        <Suspense fallback={<Skeleton count={5} />}>
          <LinkInfoLoader />
        </Suspense>
      </div>
    </section>
  );
}
