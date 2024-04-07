import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AuthedNavbar from "./_components/AuthedNavbar";
import Preview from "./customize/_components/Preview";

export default async function AuthedLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <section>
      <AuthedNavbar />
      <main
        className={cn(
          "h-[calc(100svh-126px)]  p-4",
          "md:p-6 md:pt-0",
          "flex w-full lg:gap-6 ",
        )}
      >
        <Preview />
        <Card className="relative h-full">{children}</Card>
      </main>
    </section>
  );
}
