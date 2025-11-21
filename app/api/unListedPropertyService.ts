import axiosInstance from "@/lib/axiosInstance";

export interface unListedProperty {
  _id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  address: string;
  distance: number;
  land_area: number;
  type_of_property: string;
  owner_name: string;
  owner_address: string;
  carpet_area: number;
  super_built_up_area: number;
  age_of_property: number;
  no_of_floor: number;
  floor_of_unit: number;
  flat_no: number;
  loading: number;
  type: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UnListedPropertyResponse {
  status: boolean;
  total: number;
  length: number;
  message: string;
  allUnListedProperty: unListedProperty[];
}

export const getUnListedProperty = async (
  limit: number = 10,
  skip: number = 0,
  keyword: string = ""
): Promise<UnListedPropertyResponse> => {
  try {
    const response = await axiosInstance.get(
      `/unListedProperty/search?limit=${limit}&skip=${skip}&keyword=${keyword}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch UnListed Property"
    );
  }
};

export const deleteUnlistedProperties = async (
  propertyId: string
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete(
      `/unListedProperty/${propertyId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete Staff");
  }
};

export const getUnListedPropertyById = async (
  unListedPropertyId: string
): Promise<unListedProperty> => {
  try {
    const response = await axiosInstance.get(
      `/unListedProperty/${unListedPropertyId}`
    );
    return response.data.unListedProperty;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch UnListed Property"
    );
  }
};
