import axiosInstance from "@/lib/axiosInstance";

export interface AuctionProperty {
  _id: string;
  title: string;
  possessionStatus: string;
  actionType: string;

  stateId: string;
  state: string;

  cityId: string;
  city: string;

  auctionDetails: {
    auctionStart: string;
    auctionEnd: string;
    emdEnd: string;
    auctionId: string;
  };
  builtUpArea: number;
  carpetArea: number;

  bankName: string;
  price: number;
  propertyId: string;
  createdAt: string;
  updatedAt: string;

  pinCode: string;
  ownershipOfProperty: string;
  propertyAddress: string;
  ownershipType: string;
  coBorrowerNames: string;
  registeredAddressOfBorrower: string;
  borrowerName: string;
  titleDeedType: string;
  nearestTransportStation: string;
  usps: string;
  ageOfConstruction: number;
  nearbyEducationalInstitutes: string;
  nearbyShoppingCenters: string;
  nearbyLocalities: string;
  nearbyCommercialHub: string;
  facing: string;
  images: { public_id: string; url: string }[];
  saleNoticePdf?: { originalName: string; url: string };
  views?: number;
  type_of_property: string;
  propertyArea: string;
  areaMesurment: string;
}

export interface AuctionPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  skip: number;
}

export interface AuctionPropertyResponse {
  status: boolean;
  total?: number;
  data: AuctionProperty[];
  pagination: AuctionPagination;
}

export interface AuctionPropertyFilters {
  limit?: number;
  skip?: number;
  state?: string;
  city?: string;
  location?: string;
  type?: string;
}

/* GET ALL */
export const getAuctionProperties = async (
  arg1?: number | AuctionPropertyFilters,
  arg2?: number
): Promise<AuctionPropertyResponse> => {
  try {
    const query = new URLSearchParams();

    if (typeof arg1 === "number") {
      query.append("limit", String(arg1));
      query.append("skip", String(arg2 || 0));
    }

    // ✅ Website usage: getAuctionProperties({ filters })
    else if (typeof arg1 === "object") {
      Object.entries(arg1).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          query.append(key, String(value));
        }
      });
    }
    const res = await axiosInstance.get(
      `/auction-property?${query.toString()}`
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch properties");
  }
};

/* GET BY ID */
export const getAuctionPropertyById = async (
  id: string
): Promise<AuctionProperty> => {
  try {
    const res = await axiosInstance.get(`/auction-property/${id}`);
    return res?.data?.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch property");
  }
};

/* CREATE */
export const addAuctionProperty = async (data: FormData) => {
  try {
    const res = await axiosInstance.post("/auction-property", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to add property");
  }
};

/* UPDATE */
export const updateAuctionProperty = async (id: string, data: FormData) => {
  try {
    const res = await axiosInstance.put(`/auction-property/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.property;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to update property");
  }
};

/* DELETE */
export const deleteAuctionProperty = async (
  id: string
): Promise<{ status: boolean; message: string }> => {
  try {
    const res = await axiosInstance.delete(`/auction-property/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to delete property");
  }
};

export const addPropertyInterest = async (data: Partial<any>): Promise<any> => {
  try {
    const res = await axiosInstance.post("/property-interest", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to add interest");
  }
};

export const incrementAuctionPropertyView = async (id: string, data: any) => {
  try {
    const res = await axiosInstance.post(`/auction-property/view/${id}`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to view property");
  }
};
