import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import Links from "./Links";

export default function page() {
  return (
    <main className="p-4">
      <section className="">
        <MaxWidthContainer className="rounded-t-lg bg-white p-6 shadow-sm lg:p-10">
          <header className="pb-10">
            <h1 className="text-heading-m">Customize your links</h1>
            <p className="text-body-m">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </header>

          <Links />
        </MaxWidthContainer>
        <div className="border-border/80 flex justify-end rounded-b-lg border-t bg-white px-10 py-6">
          <Button className="w-[91px]">Save</Button>
        </div>
      </section>
    </main>
  );
}
