import axiosInstance from "@/lib/axiosInstance";

export const getSubscription = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("subscription");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch subscription"
    );
  }
};
