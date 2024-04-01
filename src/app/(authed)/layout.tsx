import { cn } from "@/lib/utils";
import AuthedNavbar from "./_components/AuthedNavbar";

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
          "flex w-full  flex-row lg:gap-6 ",
        )}
      >
        {children}
      </main>
    </section>
  );
}
