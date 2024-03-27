import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function LoginPage() {
  return (
    <main className="bg-lightGray ">
      <MaxWidthContainer className="flex items-center justify-center">
        <section className="flex flex-col items-center justify-center gap-16 py-8 ">
          <div className="relative h-[40px] w-[182.5px] md:self-center">
            <Image
              src={"/images/logo-devlinks-large.svg"}
              alt="logo"
              fill
              className="absolute h-full w-full"
            />
          </div>
          <RegisterForm />
        </section>
      </MaxWidthContainer>
    </main>
  );
}
