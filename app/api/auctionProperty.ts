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

/* GET ALL */
export const getAuctionProperties = async (
  limit: number = 10,
  skip: number = 0
): Promise<AuctionPropertyResponse> => {
  try {
    const res = await axiosInstance.get(
      `/auction-property?limit=${limit}&skip=${skip}`
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
