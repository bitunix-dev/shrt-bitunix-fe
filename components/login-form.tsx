'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/services/authServices"
import { useState } from "react"
import { useRouter } from "next/navigation" // Mengubah import dari next/router menjadi next/navigation

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleClick = async () => {
    try {
      const response = await login(
        email,
        password
      )

      console.log(response)

      if(response.status === 200){
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
        </div>
        <Button type="button" onClick={() => void handleClick()} className="w-full text-black bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)]">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
