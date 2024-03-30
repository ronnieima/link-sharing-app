import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import RegisterForm from "./RegisterForm";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
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
