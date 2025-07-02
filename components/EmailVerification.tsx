"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyEmail, resendVerificationCode } from "@/services/authServices";
import { useRouter } from "next/navigation";

interface EmailVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onVerificationSuccess,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState<string>("");

  // ✅ Fix TypeScript error - use proper ref typing
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

  // ✅ Custom notification function - removed alerts
  const showNotification = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    // Notifications are now handled via UI state, no more alerts
    console.log(`${type}: ${message}`);
  };

  // ✅ Countdown timer for resend button
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // ✅ Handle input change for 6 digit code
  const handleInputChange = (index: number, value: string) => {
    // Only accept numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(""); // Reset error when user starts typing

    // Auto focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // ✅ Auto-trigger verification when all 6 digits are complete
    const updatedCode = [...newCode];
    const isComplete = updatedCode.every((digit) => digit !== "");
    
    if (isComplete && !isVerifying) {
      // Small delay to ensure state is updated
      setTimeout(() => {
        handleVerify(updatedCode);
      }, 100);
    }
  };

  // ✅ Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedData.length === 6) {
      const newCode = pastedData.split("");
      setCode(newCode);
      setError("");
      inputRefs.current[5]?.focus();
      
      // ✅ Auto-trigger verification after paste
      if (!isVerifying) {
        setTimeout(() => {
          handleVerify(newCode);
        }, 100);
      }
    }
  };

  // ✅ Submit verification - now accepts optional codeArray parameter
  const handleVerify = async (codeArray?: string[]) => {
    const verificationCode = codeArray ? codeArray.join("") : code.join("");

    if (verificationCode.length !== 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const response = await verifyEmail(email, verificationCode);

      if (response.status === 200) {
        // ✅ Check if auto-login is enabled
        if (response.data?.auto_logged_in === true && response.data?.token) {
          // Redirect to dashboard immediately without notification
          window.location.href = "/";
        } else {
          onVerificationSuccess();
        }
      }
    } catch (error: any) {
      console.error("Verification error:", error);

      if (error?.response?.status === 400) {
        setError("Invalid or expired verification code");
      } else {
        setError("An error occurred. Please try again.");
      }

      // Reset form
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // ✅ Resend verification code
  const handleResend = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await resendVerificationCode(email);

      if (response.status === 200) {
        setTimeLeft(60); // 60 seconds cooldown
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      console.error("Resend error:", error);

      if (error?.response?.status === 400) {
        setError("Email already verified");
      } else {
        setError("Failed to send verification code");
      }
    } finally {
      setIsResending(false);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Email Verification
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code that was sent to
            <br />
            <strong>{email}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ✅ 6 Digit Input */}
          <div className="space-y-2">
            <Label>Verification Code</Label>
            <div className="flex gap-2 justify-center">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-bold border-2 focus:border-[var(--bitunix)]"
                  placeholder="0"
                />
              ))}
            </div>
          </div>

          {/* ✅ Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm font-medium text-center">
                {error}
              </p>
            </div>
          )}

          {/* ✅ Verify Button - Always disabled during auto-verification */}
          <Button
            onClick={() => handleVerify()}
            disabled={isVerifying}
            className="w-full bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black font-medium disabled:opacity-50"
          >
            {isVerifying ? "Loading..." : "Verify Email"}
          </Button>

          {/* ✅ Resend Button */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Didnt receive the code?</p>
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={isResending || timeLeft > 0}
              className="text-sm"
            >
              {isResending
                ? "Sending..."
                : timeLeft > 0
                ? `Resend in ${timeLeft}s`
                : "Resend code"}
            </Button>
          </div>

          {/* ✅ Back to Login */}
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/login")}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
