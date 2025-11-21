import axiosInstance from "@/lib/axiosInstance";

export const nearestLocationReport = async (payload: any) => {
  try {
    const response = await axiosInstance.post(
      "/report/nearestLocationReport",
      payload
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create property"
    );
  }
};

export const getReportById = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/report/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch Report");
  }
};
