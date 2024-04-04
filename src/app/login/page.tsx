import { getUser } from "@/lib/auth";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "./_components/LoginForm";

export default async function LoginPage() {
  const user = await getUser();

  if (user) {
    return redirect("/");
  }
  return (
    <main className=" bg-lightGray">
      <MaxWidthContainer className="flex items-center  justify-center md:min-h-svh">
        <section className="flex flex-col items-center justify-center gap-16 py-8 ">
          <div className="relative h-[40px] w-[182.5px] md:self-center">
            <Image
              src={"/images/logo-devlinks-large.svg"}
              alt="logo"
              fill
              className="absolute h-full w-full"
            />
          </div>
          <LoginForm />
        </section>
      </MaxWidthContainer>
    </main>
  );
}
