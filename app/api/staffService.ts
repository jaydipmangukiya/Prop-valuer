import axiosInstance from "@/lib/axiosInstance";

export interface Staff {
  _id: string;
  role: string;
  email: string;
  permissions: any[];
  is_paid: boolean;
  no_of_report: number;
  login_attempts: number;
  no_of_pdf: number;
  is_verified: boolean;
  is_new: boolean;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  name?: string;
  phone?: string;
}

export interface UsersResponse {
  status: boolean;
  total: number;
  length: number;
  message: string;
  users: Staff[];
}

export const getStaffs = async (
  limit: number = 10,
  skip: number = 0
): Promise<UsersResponse> => {
  try {
    const response = await axiosInstance.get(
      `/user/staff?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch Staff");
  }
};

export const getStaffById = async (staffId: string): Promise<Staff> => {
  try {
    const response = await axiosInstance.get(`/user/${staffId}`);
    return response?.data?.user;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch Staff");
  }
};

export const addStaff = async (staffData: Partial<Staff>): Promise<Staff> => {
  try {
    const response = await axiosInstance.post("/user/staff", staffData);
    return response.data.staff;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to add Staff");
  }
};

export const updateStaff = async (
  staffId: string,
  staffData: Partial<Staff>
): Promise<Staff> => {
  try {
    const response = await axiosInstance.put(`/user/${staffId}`, staffData);
    return response.data.staff;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update Staff");
  }
};

export const deleteStaff = async (
  staffId: string
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete(`/user/${staffId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete Staff");
  }
};
