import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
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

    // ✅ Simpan token ke localStorage
    if (data.data?.token) {
      localStorage.setItem("auth_token", data.data.token);
      localStorage.setItem("user_data", JSON.stringify(data.data.user));
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (email: string, password: string, password_confirmation: string) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
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

export const verifyEmail = async (email: string, code: string) => {
  try {
    const response = await fetch(`${API_URL}/verify-email`, {
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

export const resendVerificationCode = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/resend-verification`, {
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

export const logout = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    
    if (token) {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
    }

    // ✅ Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    // Even if API call fails, clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    throw error;
  }
};

// ✅ Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("auth_token");
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
  return localStorage.getItem("auth_token");
};