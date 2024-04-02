import LinkInfoLoader from "@/components/ui/LinkInfoLoader";
import { Suspense } from "react";

export default async function PreviewPage() {
  return (
    <main className=" ">
      <div className="absolute top-0 -z-10 hidden h-[357px] w-full rounded-b-[32px] bg-purple md:block"></div>
      <div className="flex h-screen  flex-col items-center justify-center rounded-3xl bg-white py-12 md:mx-auto md:h-full md:max-w-[349px] md:shadow-lg">
        <Suspense fallback={<p className="text-4xl">DURIAN</p>}>
          <LinkInfoLoader />
        </Suspense>
      </div>
    </main>
  );
}
