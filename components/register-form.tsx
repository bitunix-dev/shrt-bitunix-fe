'use client'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/services/authServices"
import { useState } from "react"
import { useRouter } from "next/navigation" // Mengubah import dari next/router menjadi next/navigation

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password_confirmation, setPassword_confirmation] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Mencegah perilaku default form
    
    if (isSubmitting) return;
    setIsSubmitting(true)

    try {
      const response = await register(
        email,
        password,
        password_confirmation
      )
      console.log(response);
      if (response.status === 201) {
        router.push('/login') // Menggunakan router.push dari next/navigation
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      {...props}
      onSubmit={handleSubmit} // Menambahkan onSubmit handler
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input 
            onChange={(e) => setEmail(e.target.value)} 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input 
            onChange={(e) => setPassword(e.target.value)} 
            id="password" 
            type="password" 
            required 
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            onChange={(e) => setPassword_confirmation(e.target.value)} 
            id="confirmPassword" 
            type="password" 
            required 
          />
        </div>
        <Button 
          type="submit" 
          className="w-full text-black bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  )
}