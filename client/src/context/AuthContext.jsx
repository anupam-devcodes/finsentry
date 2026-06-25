import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { getCurrentUser } from "../api/userApi";

export const AuthContext = createContext(null);

function extractUser(data) {
  return data?.user || data?.data?.user || data?.data || null;
}

function extractToken(data) {
  return data?.token || data?.accessToken || data?.data?.token || null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  async function register(formData) {
    const data = await registerUser(formData);

    const token = extractToken(data);
    const userData = extractUser(data);

    if (token) {
      localStorage.setItem("token", token);
    }

    setUser(userData);

    return data;
  }

  async function login(formData) {
    const data = await loginUser(formData);

    const token = extractToken(data);
    const userData = extractUser(data);

    if (token) {
      localStorage.setItem("token", token);
    }

    setUser(userData);

    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        const userData = extractUser(data);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    loadUser();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isAuthLoading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}