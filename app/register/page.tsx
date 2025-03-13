import { RegisterForm } from "@/components/register-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 text-white">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://static.bitunix.com/web/bitunix-assets/d4dcce.CePIhzzp.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Image
            src="https://res.cloudinary.com/dilb4d364/image/upload/v1741247207/logo_file-01_lif9pq.png"
            alt="logo"
            width={100}
            height={100}
            className="w-36" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <RegisterForm />
        </div>
      </div>
    </div>
    </div >
  )
}
