"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/authServices";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Mengubah import dari next/router menjadi next/navigation

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const router = useRouter();

  const handleClick = async () => {
    // Validate email domain
    const emailDomain = email.split("@")[1];
    if (emailDomain !== "bitunix.io" && emailDomain !== "bitunix.com") {
      setEmailError(
        "Please enter an email with @bitunix.io or @bitunix.com domain."
      );
      return;
    }
    setEmailError(""); // Clear error if email is valid

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
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}{" "}
          {/* Display error message */}
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
          className="w-full p-5 text-black bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] mt-3"
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
