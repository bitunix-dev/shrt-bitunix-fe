"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/services/authServices";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Mengubah import dari next/router menjadi next/navigation

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPassword_confirmation] =
    useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah perilaku default form

    if (isSubmitting) return;
    setIsSubmitting(true);

    // Validate email domain
    const emailDomain = email.split("@")[1];
    if (emailDomain !== "bitunix.io" && emailDomain !== "bitunix.com") {
      setEmailError(
        "Please enter an email with @bitunix.io or @bitunix.com domain."
      );
      setIsSubmitting(false);
      return;
    }

    setEmailError(""); // Clear error if valid email

    try {
      const response = await register(email, password, password_confirmation);
      console.log(response);
      if (response.status === 201) {
        router.push("/login"); // Menggunakan router.push dari next/navigation
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit} // Menambahkan onSubmit handler
    >
      <div className="flex flex-col items-start gap-2 text-left">
        <h1 className="text-3xl font-bold">Create your account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="text-md p-5"
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}{" "}
          {/* Display error message */}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Enter your password"
            className="text-md p-5"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            onChange={(e) => setPassword_confirmation(e.target.value)}
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="text-md p-5"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full p-5 text-black bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </div>
      <div className="text-left text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
