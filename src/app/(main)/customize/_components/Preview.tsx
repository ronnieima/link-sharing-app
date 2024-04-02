import LinkInfo from "@/components/ui/LinkInfo";
import LinkInfoLoader from "@/components/ui/LinkInfoLoader";
import { LinkType } from "@/lib/db/schema";
import { User } from "lucia";
import { Suspense } from "react";

type Props = { user?: User; links?: LinkType[] };

export default function Preview({ user, links }: Props) {
  return (
    <section className="hidden items-center justify-center rounded-lg bg-white  py-16 lg:flex lg:min-w-[320px] xl:min-w-[560px]">
      <div className="relative ">
        <img src="images/illustration-phone-mockup.svg" alt="phone" />
        <div className="absolute top-0 flex h-full w-full flex-col items-center gap-[25px] px-8 py-16">
          <Suspense fallback={"AYOOOOOOOOOOOOOOOOOOOo"}>
            <LinkInfoLoader />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
