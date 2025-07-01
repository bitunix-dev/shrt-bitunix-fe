"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { login } from "@/services/authServices";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EmailVerification } from "@/components/EmailVerification";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string>("");

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
      setEmailError(
        "Please enter an email with @bitunix.io or @bitunix.com domain."
      );
    } else {
      setEmailError("");
    }
  }, [email, password]);

  // ✅ Handle login submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await login(email, password);

      if (response.status === 200) {
        // ✅ Don't show alert, just redirect quietly
        console.log("Login successful, redirecting to dashboard...");

        // ✅ Force page reload after redirect to ensure middleware picks up the cookie
        window.location.href = "/";
      }
    } catch (error: any) {
      console.error("Login error:", error);

      // ✅ Handle email verification required
      if (error.needs_verification) {
        setUnverifiedEmail(error.email || email);
        setShowVerification(true);
      } else {
        // Handle other login errors
        setLoginError(
          error.message || "Login failed. Please check your email and password."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle successful verification
  const handleVerificationSuccess = () => {
    setShowVerification(false);
    // Reset form
    setPassword("");
    setLoginError("");
    // Show message for manual login (when auto-login is not enabled)
    alert("✅ Email verified successfully! Please login again.");
  };

  // ✅ If verification needs to be shown
  if (showVerification) {
    return (
      <EmailVerification
        email={unverifiedEmail}
        onVerificationSuccess={handleVerificationSuccess}
      />
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
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
            value={email}
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
            value={password}
          />
        </div>

        {/* ✅ Login Error Message */}
        {loginError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm font-medium">⚠️ {loginError}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full p-5 text-black bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-left text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
