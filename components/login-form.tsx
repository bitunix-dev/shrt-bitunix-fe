"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/authServices";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const router = useRouter();

  // Validate email function
  const validateEmail = (email: string): boolean => {
    if (!email) return false;
    
    const emailDomain = email.split("@")[1];
    return emailDomain === "bitunix.io" || emailDomain === "bitunix.com";
  };

  // Check form validity whenever inputs change
  useEffect(() => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length > 0;
    
    setIsFormValid(isEmailValid && isPasswordValid);
    
    // Update email error message
    if (email && !isEmailValid) {
      setEmailError("Please enter an email with @bitunix.io or @bitunix.com domain.");
    } else {
      setEmailError("");
    }
  }, [email, password]);

  const handleClick = async () => {
    if (!isFormValid) return;
    
    try {
      const response = await login(email, password);

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-start gap-2 text-left">
        <h1 className="text-3xl font-bold">Log in</h1>
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
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Enter your password"
            className="text-md p-5"
            required
          />
        </div>
        <Button
          type="button"
          onClick={() => void handleClick()}
          className="w-full p-5 text-black bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >
          Login
        </Button>
      </div>
      <div className="text-left text-sm">
        No account yet?{" "}
        <a href="/register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}