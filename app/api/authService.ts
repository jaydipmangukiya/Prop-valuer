import axiosInstance from "@/lib/axiosInstance";

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/login", { email, password });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/user", payload);

    if (res.data?.token) {
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Registration failed");
  }
};

export const verifyOtp = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/verify", payload);
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "OTP verification failed"
    );
  }
};
