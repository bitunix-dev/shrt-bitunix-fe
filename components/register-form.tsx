"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/services/authServices";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EmailVerification } from "@/components/EmailVerification";

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
  const [passwordError, setPasswordError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  const router = useRouter();

  // ✅ Custom notification function
  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    if (type === "success") {
      alert(`✅ ${message}`);
    } else {
      alert(`❌ ${message}`);
    }
  };

  // Validate email function
  const validateEmail = (email: string): boolean => {
    if (!email) return false;

    const emailDomain = email.split("@")[1];
    return emailDomain === "bitunix.io" || emailDomain === "bitunix.com";
  };

  // Validate password match
  const validatePasswordMatch = (
    password: string,
    confirmation: string
  ): boolean => {
    if (!password || !confirmation) return false;
    return password === confirmation;
  };

  // Validate form on input changes
  useEffect(() => {
    // Check email validity
    const isEmailValid = validateEmail(email);

    // Update email error message
    if (email && !isEmailValid) {
      setEmailError(
        "Please enter an email with @bitunix.io or @bitunix.com domain."
      );
    } else {
      setEmailError("");
    }

    // Check password match
    const doPasswordsMatch = validatePasswordMatch(
      password,
      password_confirmation
    );

    // Update password error message
    if (password && password_confirmation && !doPasswordsMatch) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }

    // Check if all fields are filled and valid
    const isPasswordValid = password.length >= 6; // Minimum 6 characters

    setIsFormValid(
      isEmailValid &&
        isPasswordValid &&
        doPasswordsMatch &&
        !!email &&
        !!password &&
        !!password_confirmation
    );
  }, [email, password, password_confirmation]);

  // ✅ Handle registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || !isFormValid) return;
    setIsSubmitting(true);

    try {
      const response = await register(email, password, password_confirmation);
      console.log(response);

      if (response.status === 201) {
        showNotification(
          "Registration successful! Please check your email for verification code.",
          "success"
        );
        setRegisteredEmail(email);
        setShowVerification(true);
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      // Handle different types of errors
      if (error?.response?.status === 422) {
        const errorData = error.response.data;
        if (errorData?.errors?.email) {
          setEmailError(errorData.errors.email[0]);
        }
        showNotification("Email already registered!", "error");
      } else {
        showNotification("Registration failed!", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Handle successful verification
  const handleVerificationSuccess = () => {
    showNotification("Email verified successfully! Please login.", "success");
    router.push("/login");
  };

  // ✅ If verification needs to be shown
  if (showVerification) {
    return (
      <EmailVerification
        email={registeredEmail}
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
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Enter your password (min. 6 characters)"
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
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full p-5 text-black bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </div>
      <div className="text-left text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
