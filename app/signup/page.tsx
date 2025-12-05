import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SignUpUserAuthForm } from "./user-auth-form"
import Logo from "@/components/logo"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="relative h-screen overflow-hidden flex flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative flex h-[45vh] flex-col overflow-hidden bg-muted p-6 text-white lg:h-full lg:p-10 dark:border-r">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 lg:scale-100" 
            style={{ backgroundImage: "url('/ucek.jpeg')" }} 
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src="/logo.svg" alt="Logo" width={56} height={56} className="mr-2 h-10 w-auto lg:h-14 brightness-0 invert" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-start gap-6 sm:w-[450px] pt-10 pb-10">
            <div className="flex flex-col gap-2 text-center">
              <Logo />
              <p className="text-muted-foreground text-sm">
                Enter your details to signup.
              </p>
            </div>
            <SignUpUserAuthForm />
            <p className="px-6 text-center text-xs text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
