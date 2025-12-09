import axiosInstance from "@/lib/axiosInstance";

export const getPropertyInterests = async (limit = 10, skip = 0) => {
  try {
    const res = await axiosInstance.get(
      `/property-interest?limit=${limit}&skip=${skip}`
    );
    return res.data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.message || "Failed to load interests");
    }
    throw new Error("Network error");
  }
};

export const updatePropertyInterest = async (id: string, payload: any) => {
  try {
    const res = await axiosInstance.put(`/property-interest/${id}`, payload);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.message || "Failed to update status");
    }
    throw new Error("Network error");
  }
};
