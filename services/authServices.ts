// services/authServices.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bitunixads.com/api";

// ✅ Helper function to set HTTP-only style cookie (as much as possible from client-side)
const setSecureCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  // Set cookie with secure options
  const cookieOptions = [
    `${name}=${value}`,
    `expires=${expires.toUTCString()}`,
    `path=/`,
    `SameSite=Strict`,
    // Note: Can't set HttpOnly from client-side, but we'll handle this in API route
  ];
  
  document.cookie = cookieOptions.join(';');
};

// ✅ Helper function to remove cookie
const removeCookie = (name: string) => {
  const cookieOptions = [
    `${name}=`,
    `expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `path=/`,
    `SameSite=Strict`
  ];
  document.cookie = cookieOptions.join(';');
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

// ✅ Login function - Store token via API route for proper HttpOnly cookie
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
      if (response.status === 401 && data.data?.email_verification_required) {
        const error = new Error(data.message);
        (error as any).needs_verification = true;
        (error as any).email = data.data.email || email;
        throw error;
      }
      
      throw new Error(data.message || "Login failed");
    }

    // ✅ Store token via API route to set proper HttpOnly cookie
    if (data.data?.token) {
      try {
        const cookieResponse = await fetch('/api/auth/set-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: data.data.token,
            user: data.data.user,
          }),
        });

        if (!cookieResponse.ok) {
          console.error('Failed to set auth cookie');
          // Fallback to client-side storage
          setSecureCookie("token", data.data.token, 7);
          setSecureCookie("userName", data.data.user.name, 7);
          setSecureCookie("avatar", data.data.user.avatar || "", 7);
        }
      } catch (error) {
        console.error('Error setting auth cookie:', error);
        // Fallback to client-side storage
        setSecureCookie("token", data.data.token, 7);
        setSecureCookie("userName", data.data.user.name, 7);
        setSecureCookie("avatar", data.data.user.avatar || "", 7);
      }
      
      // Also store in localStorage for backward compatibility and client-side access
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

// ✅ Logout function
export const logout = async () => {
  try {
    // Call logout API route to clear HttpOnly cookie
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Also clear client-side storage
    removeCookie("token");
    removeCookie("userName");
    removeCookie("avatar");
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