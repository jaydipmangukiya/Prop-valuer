import axiosInstance from "@/lib/axiosInstance";

export interface Properties {
  _id: string;
  type_of_property: string;
  address: string;
  area_rate_considered_per_sq_ft?: number;
  land_rate_per_sq_mtr_Sq_yard?: number;
  createdAt: string;
  is_active: boolean;
  is_verified: boolean;
  updatedAt: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface PropertiesResponse {
  status: boolean;
  total: number;
  length: number;
  message: string;
  allProperty: Properties[];
}

export const getProperties = async (
  limit: number = 10,
  skip: number = 0
): Promise<PropertiesResponse> => {
  try {
    const response = await axiosInstance.get(
      `/property?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch Properties");
  }
};

export const deleteProperty = async (
  propertyId: string
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete(`/property/${propertyId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete property");
  }
};

export const getPropertyById = async (
  propertyId: string
): Promise<Properties> => {
  try {
    const response = await axiosInstance.get(`/property/${propertyId}`);
    return response.data.property;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch property");
  }
};

export const createProperty = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/property", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create property");
  }
};

export const updateProperty = async (propertyId: string, payload: any) => {
  try {
    const response = await axiosInstance.put(
      `/property/${propertyId}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update property");
  }
};
