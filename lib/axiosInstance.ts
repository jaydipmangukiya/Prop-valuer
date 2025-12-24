import axios from "axios";
import { navigate } from "@/lib/navigation";
import { dispatchAuthEvent } from "@/lib/authEvents";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token (if available)
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let isRedirectingDueTo401 = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong";
    if (status === 401) {
      if (typeof window !== "undefined" && !isRedirectingDueTo401) {
        isRedirectingDueTo401 = true;
        localStorage.removeItem("token");
        localStorage.removeItem("userData");

        // Dispatch auth event to notify UserProvider immediately (same tab)
        dispatchAuthEvent({ type: "TOKEN_EXPIRED" });

        // Redirect to login using Next.js navigation
        navigate("/login", { replace: true });

        // Reset flag after delay
        setTimeout(() => {
          isRedirectingDueTo401 = false;
        }, 1000);
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
