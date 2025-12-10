import axiosInstance from "@/lib/axiosInstance";

export interface User {
  _id: string;
  role: string;
  email: string;
  module: any[];
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
  subscriptions_id: string | null;
}

export interface UsersResponse {
  status: boolean;
  total: number;
  length: number;
  message: string;
  users: User[];
}

export interface UserFormData {
  email: string;
  name: string;
  phone: string;
  role: string;
  password: string;
}

export interface DeleteUserResponse {
  status: boolean;
  message: string;
}

// Get all users with pagination
export const getUsers = async (
  limit: number = 10,
  skip: number = 0
): Promise<UsersResponse> => {
  try {
    const response = await axiosInstance.get(
      `/user?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch users");
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data.user;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch user");
  }
};

export const createUser = async (userData: UserFormData) => {
  try {
    const response = await axiosInstance.post("/user", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create user");
  }
};

export const deleteUser = async (
  userId: string
): Promise<DeleteUserResponse> => {
  try {
    const response = await axiosInstance.delete(`/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete user");
  }
};
