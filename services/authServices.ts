// services/authServices.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ✅ Helper function to set cookie
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

// ✅ Helper function to remove cookie
const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
};

// ✅ Register function
export const register = async (email: string, password: string, password_confirmation: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// ✅ Login function with cookie storage and email verification check
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // ✅ Handle email verification error
      if (response.status === 403 && data.needs_verification) {
        const error = new Error(data.message);
        (error as any).needs_verification = true;
        (error as any).email = email;
        throw error;
      }
      
      throw new Error(data.message || "Login failed");
    }

    // ✅ Store token and user data in cookies (not localStorage)
    if (data.data?.token) {
      setCookie("token", data.data.token, 7); // 7 days expiry
      setCookie("userName", data.data.user.name, 7);
      setCookie("avatar", data.data.user.avatar || "", 7);
      
      // Also store in localStorage for backward compatibility
      localStorage.setItem("auth_token", data.data.token);
      localStorage.setItem("user_data", JSON.stringify(data.data.user));
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ✅ Verify Email function
export const verifyEmail = async (email: string, code: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Email verification failed");
    }

    return data;
  } catch (error) {
    console.error("Email verification error:", error);
    throw error;
  }
};

// ✅ Resend Verification Code function
export const resendVerificationCode = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to resend verification code");
    }

    return data;
  } catch (error) {
    console.error("Resend verification error:", error);
    throw error;
  }
};

// ✅ Logout function - clear both cookies and localStorage
export const logout = async () => {
  try {
    const token = getCookie("token") || localStorage.getItem("auth_token");
    
    if (token) {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
    }

    // ✅ Clear cookies
    removeCookie("token");
    removeCookie("userName");
    removeCookie("avatar");
    
    // ✅ Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    // Even if API call fails, clear storage
    removeCookie("token");
    removeCookie("userName");
    removeCookie("avatar");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    throw error;
  }
};

// ✅ Helper function to get cookie
const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

// ✅ Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!(getCookie("token") || localStorage.getItem("auth_token"));
};

// ✅ Get current user data
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  
  const userData = localStorage.getItem("user_data");
  return userData ? JSON.parse(userData) : null;
};

// ✅ Get auth token
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return getCookie("token") || localStorage.getItem("auth_token");
};