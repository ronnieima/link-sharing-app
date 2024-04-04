import LinkInfoLoader from "@/components/ui/LinkInfoLoader";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function Preview() {
  return (
    <section className="hidden items-center justify-center rounded-lg bg-white  py-16 lg:flex lg:min-w-[320px] xl:min-w-[560px]">
      <div className="relative ">
        <img src="images/illustration-phone-mockup.svg" alt="phone" />
        <div className="absolute top-0 flex h-full w-full flex-col items-center gap-[25px] px-8 py-16">
          <Suspense fallback={<Skeleton count={5} />}>
            <LinkInfoLoader />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
