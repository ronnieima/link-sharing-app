import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function NavbarContainer({ children, className }: Props) {
  return (
    <nav className={cn("h-[74px]  md:h-[126px] md:p-6")}>
      <section
        className={cn(
          "flex h-full items-center justify-between rounded-lg bg-white px-6",
          className,
        )}
      >
        {children}
      </section>
    </nav>
  );
}
