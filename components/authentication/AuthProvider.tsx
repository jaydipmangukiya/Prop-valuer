"use client";

import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { dispatchAuthEvent, subscribe } from "@/lib/authEvents";
import axiosInstance from "@/lib/axiosInstance";

interface User {
  id: string;
  role?: string;
  permissions?: string[];
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuth: boolean;
  logout: () => void;
  refetch: () => Promise<void>;
}

import React, { createContext } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user from token
  const refetch = async () => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(localToken);
      if (decoded?.id) {
        const { data } = await axiosInstance.get(`/user/${decoded.id}`);
        setUser(data.user);
        setToken(localToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch {
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize on mount
  useEffect(() => {
    refetch();
  }, []);

  // Listen to auth events (token expired, logout)
  useEffect(() => {
    const unsubscribe = subscribe((event) => {
      if (event.type === "TOKEN_EXPIRED" || event.type === "LOGOUT") {
        setUser(null);
        setToken(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Sync across tabs
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        setUser(null);
        setToken(null);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    dispatchAuthEvent({ type: "LOGOUT" });
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuth: !!token && !!user,
        logout,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
