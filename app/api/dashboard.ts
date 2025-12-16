import axiosInstance from "@/lib/axiosInstance";

export interface DashboardStatsResponse {
  status: boolean;
  data: {
    totalUsers: number;
    propertiesListed: number;
    valuationsToday: number;
  };
  message: string;
}

export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
  try {
    const response = await axiosInstance.get("/admin/dashboard-stats");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch dashboard stats"
    );
  }
};
