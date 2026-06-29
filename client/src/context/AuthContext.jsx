import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { getCurrentUser } from "../api/userApi";

export const AuthContext = createContext(null);

function extractUser(data) {
  return data?.user || data?.data?.user || data?.data || null;
}

function extractToken(data) {
  return (
    data?.token ||
    data?.accessToken ||
    data?.access_token ||
    data?.jwt ||
    data?.data?.token ||
    data?.data?.accessToken ||
    data?.data?.access_token ||
    data?.data?.jwt ||
    data?.tokens?.accessToken ||
    data?.data?.tokens?.accessToken ||
    null
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  async function register(formData) {
  const registerResponse = await registerUser(formData);

  let token = extractToken(registerResponse);
  let userData = extractUser(registerResponse);

  // If register API does not return token, auto-login after successful registration
  if (!token) {
    const loginResponse = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    token = extractToken(loginResponse);
    userData = extractUser(loginResponse);
  }

  if (!token) {
    localStorage.removeItem("token");
    setUser(null);
    throw new Error("Account created, but automatic login failed. Please login manually.");
  }

  localStorage.setItem("token", token);
  setUser(userData);

  return {
    data: registerResponse,
    token,
    user: userData,
  };
}

  async function login(formData) {
    const data = await loginUser(formData);

    const token = extractToken(data);
    const userData = extractUser(data);

    if (!token) {
      localStorage.removeItem("token");
      setUser(null);
      throw new Error("Login failed. Token was not received from server.");
    }

    localStorage.setItem("token", token);
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