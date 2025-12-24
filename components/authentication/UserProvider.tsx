"use client";

import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { subscribe } from "@/lib/authEvents";

interface UserContextType {
  token: string | null;
  userData: any;
  loading: boolean;
  initializing: boolean;
  setToken: (token: string | null) => void;
  setUserData: (user: any) => void;
  refetchUserData: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState(true);

  /** --------------------------------------------------
   *  FETCH USER DETAILS FROM BACKEND
   * -------------------------------------------------- */
  const getUserDetail = async (decoded: { id: string }) => {
    try {
      const response = await axiosInstance.get(`/user/${decoded.id}`);
      setUserData(response.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  /** --------------------------------------------------
   *  FETCH TOKEN → DECODE → LOAD USER
   * -------------------------------------------------- */
  const refetchUserData = () => {
    setLoading(true);

    const localToken = localStorage.getItem("token");

    if (!localToken) {
      setUserData(null);
      setToken(null);
      setLoading(false);
      return;
    }

    setToken(localToken);

    try {
      const decoded: any = jwtDecode(localToken);
      if (decoded?.id) {
        getUserDetail(decoded);
      } else {
        setUserData(null);
        setLoading(false);
      }
    } catch (e) {
      console.error("Invalid token");
      setUserData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await refetchUserData(); // ✔ Wait for token + user load
      setInitializing(false); // ✔ DONE INITIALIZING
    };
    init();
  }, []);

  /** --------------------------------------------------
   *  SYNC LOGIN/LOGOUT ACROSS TABS
   * -------------------------------------------------- */
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === "token") {
        // If token was removed (logout/token expired), clear user data
        if (!e.newValue) {
          setToken(null);
          setUserData(null);
        } else {
          refetchUserData();
        }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  /** --------------------------------------------------
   *  LISTEN TO TOKEN EXPIRATION EVENTS (same tab)
   * -------------------------------------------------- */
  useEffect(() => {
    const unsubscribe = subscribe((event) => {
      if (event.type === "TOKEN_EXPIRED" || event.type === "LOGOUT") {
        setToken(null);
        setUserData(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        userData,
        loading,
        initializing,
        setToken,
        setUserData,
        refetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
