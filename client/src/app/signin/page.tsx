import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import LabelInput from "@/components/ui/LabelInput";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
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
          <form className="mx-auto max-w-[476px] space-y-10 md:rounded-lg md:bg-white md:p-10 md:shadow-sm">
            <header className="space-y-2">
              <h1 className="text-heading-m">Login</h1>
              <p className="text-body-m">
                Add your details below to get back into the app
              </p>
            </header>
            <div className="space-y-6">
              <LabelInput
                label="Email address"
                type="email"
                placeholder="e.g. alex@email.com"
                icon="/images/icon-email.svg"
              />
              <LabelInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon="/images/icon-password.svg"
              />
              <Button variant={"default"}>Login</Button>
            </div>
            <footer className="text-body-m flex w-full flex-col items-center justify-center md:flex-row md:gap-1">
              <p>Don&apos;t have an account?</p>
              <Link
                className="text-purple hover:text-purpleHover  transition-colors"
                href={"/register"}
              >
                Create account
              </Link>
            </footer>
          </form>
        </section>
      </MaxWidthContainer>
    </main>
  );
}
