import axiosInstance from "@/lib/axiosInstance";

export const getPropertyInterests = async (limit = 10, skip = 0) => {
  try {
    const res = await axiosInstance.get(
      `/property-interest?limit=${limit}&skip=${skip}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to load interests");
  }
};

export const updatePropertyInterest = async (id: string, payload: any) => {
  try {
    const res = await axiosInstance.put(`/property-interest/${id}`, payload);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to update interest");
  }
};

export const deletePropertyInterest = async (
  id: string
): Promise<{ status: boolean; message: string }> => {
  try {
    const res = await axiosInstance.delete(`/property-interest/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to delete interest");
  }
};
