import axiosInstance from "@/lib/axiosInstance";

export interface CookieConsentRecord {
  id: string;
  userId?: string;
  fingerprint: string;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  status: "accepted_all" | "rejected_all" | "custom" | "not_set";
  userAgent?: string;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CookieConsentStatsResponse {
  status: boolean;
  data: {
    totalResponses: number;
    acceptedAll: number;
    rejectedAll: number;
    customPreferences: number;
    analyticsAccepted: number;
    analyticsRejected: number;
    marketingAccepted: number;
    marketingRejected: number;
    acceptancePercentage: number;
    analyticsByDay: Array<{
      date: string;
      count: number;
      acceptedCount: number;
      rejectedCount: number;
    }>;
  };
  message: string;
}

export interface CookieConsentListResponse {
  status: boolean;
  data: {
    records: CookieConsentRecord[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
}

/**
 * Submit cookie consent preferences to backend for tracking
 */
export const submitCookieConsent = async (
  fingerprint: string,
  preferences: {
    status: "accepted_all" | "rejected_all" | "custom" | "not_set";
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  },
) => {
  try {
    const response = await axiosInstance.post("/submit", {
      fingerprint,
      ...preferences,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to submit cookie consent:", error);
    // Don't throw - we don't want to disrupt user experience if tracking fails
    return null;
  }
};

/**
 * Get cookie consent analytics/statistics
 */
export const getCookieConsentStats =
  async (): Promise<CookieConsentStatsResponse> => {
    try {
      const response = await axiosInstance.get("/admin/statistics");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message ||
          "Failed to fetch cookie consent statistics",
      );
    }
  };

/**
 * Get cookie consent records with pagination
 */
export const getCookieConsentRecords = async (
  page: number = 1,
  limit: number = 50,
): Promise<CookieConsentListResponse> => {
  try {
    const response = await axiosInstance.get("/admin/records", {
      params: { page, limit },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to fetch cookie consent records",
    );
  }
};

/**
 * Export cookie consent data as CSV
 */
export const exportCookieConsentData = async () => {
  try {
    const response = await axiosInstance.get("/admin/export-csv", {
      responseType: "blob",
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to export cookie consent data",
    );
  }
};
