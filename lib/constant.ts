export const rowPerPage = 10;

export const roleOptions = [
  { label: "Valuer", value: "VALUER" },
  { label: "Banker", value: "BANKER" },
  { label: "Broker", value: "BROKER" },
  { label: "Individual", value: "INDIVIDUAL" },
];

export const DASHBOARD_ROLES = ["SUPER_ADMIN", "MANAGER", "VALUER", "BANKER"];

export const PERMISSIONS = {
  DASHBOARD: {
    label: "Dashboard",
    actions: {
      VIEW: "DASHBOARD_VIEW",
    },
  },

  USER: {
    label: "Users",
    actions: {
      VIEW: "USER_VIEW",
      ADD: "USER_ADD",
      EDIT: "USER_EDIT",
      DELETE: "USER_DELETE",
    },
  },

  PROPERTY: {
    label: "Property",
    actions: {
      VIEW: "PROPERTY_VIEW",
      ADD: "PROPERTY_ADD",
      EDIT: "PROPERTY_EDIT",
      DELETE: "PROPERTY_DELETE",
    },
  },

  UNLISTED_PROPERTY: {
    label: "Unlisted Property",
    actions: {
      VIEW: "UNLISTED_PROPERTY_VIEW",
      ADD: "UNLISTED_PROPERTY_ADD",
      EDIT: "UNLISTED_PROPERTY_EDIT",
      DELETE: "UNLISTED_PROPERTY_DELETE",
    },
  },

  STAFF: {
    label: "Staff",
    actions: {
      VIEW: "STAFF_VIEW",
      ADD: "STAFF_ADD",
      EDIT: "STAFF_EDIT",
      DELETE: "STAFF_DELETE",
    },
  },

  VALUATION: {
    label: "Valuation",
    actions: {
      VIEW: "VALUATION_VIEW",
      ADD: "VALUATION_ADD",
      EDIT: "VALUATION_EDIT",
      DELETE: "VALUATION_DELETE",
    },
  },

  AUCTION_PROPERTY: {
    label: "Auction Property",
    actions: {
      VIEW: "AUCTION_PROPERTY_VIEW",
      ADD: "AUCTION_PROPERTY_ADD",
      EDIT: "AUCTION_PROPERTY_EDIT",
      DELETE: "AUCTION_PROPERTY_DELETE",
    },
  },

  INTERESTED_PROPERTY: {
    label: "Interested Property",
    actions: {
      VIEW: "INTERESTED_PROPERTY_VIEW",
      ADD: "INTERESTED_PROPERTY_ADD",
      EDIT: "INTERESTED_PROPERTY_EDIT",
      DELETE: "INTERESTED_PROPERTY_DELETE",
    },
  },

  SUPPORT_QUERIES: {
    label: "Support Queries",
    actions: {
      VIEW: "SUPPORT_QUERIES_VIEW",
      EDIT: "SUPPORT_QUERIES_EDIT",
    },
  },

  SETTINGS: {
    label: "Settings",
    actions: {
      VIEW: "SETTINGS_VIEW",
      EDIT: "SETTINGS_EDIT",
    },
  },
} as const;

export const propertyTypeOptions = [
  { label: "Residential Flat", value: "Residential Flat" },
  { label: "Residential Plot", value: "Residential Plot" },
  { label: "Residential House", value: "Residential House" },
  { label: "Commercial Shop", value: "Commercial Shop" },
  { label: "Office", value: "Office" },
  { label: "Industrial Plot", value: "Industrial Plot" },
  { label: "Agricultural Land", value: "Agricultural Land" },
  { label: "NA Land", value: "NA Land" },
];

export const bankOptions = [
  { label: "Bank of Baroda", value: "Bank of Baroda" },
  { label: "Central Bank of India", value: "Central Bank of India" },
  { label: "Bank of India", value: "Bank of India" },
  { label: "Punjab National Bank", value: "Punjab National Bank" },
  { label: "Indian Bank", value: "Indian Bank" },
  { label: "Bank of Maharashtra", value: "Bank of Maharashtra" },
  { label: "UCO Bank", value: "UCO Bank" },
  { label: "Union Bank of India", value: "Union Bank of India" },
  {
    label: "Tata Capital Finance Limited",
    value: "Tata Capital Finance Limited",
  },
  { label: "Canara Bank", value: "Canara Bank" },
];

export const areaMeasurementOptions = [
  { label: "SQFT", value: "sqft" },
  { label: "SQMT", value: "sqmt" },
  { label: "Yard Area", value: "yard area" },
];

export const facingOptions = [
  { label: "North", value: "North" },
  { label: "South", value: "South" },
  { label: "East", value: "East" },
  { label: "West", value: "West" },
];

export const possessionStatusOptions = [
  { label: "Ready to Move", value: "Ready to Move" },
  { label: "Under Construction", value: "Under Construction" },
  { label: "Ongoing", value: "Ongoing" },
];

export const bathroomOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: ">10", value: ">10" },
  { label: "None", value: "None" },
];

export const furnishingStatusOptions = [
  { label: "Furnished", value: "Furnished" },
  { label: "Semi-Furnished", value: "Semi-Furnished" },
  { label: "Unfurnished", value: "Unfurnished" },
];

export const overlookingOptions = [
  { label: "Garden", value: "Garden" },
  { label: "Main Road", value: "Main Road" },
];

export const plotShapeOptions = [
  { label: "Regular (Square / Rectangle)", value: "Regular" },
  { label: "Irregular", value: "Irregular" },
  { label: "Corner Plot", value: "Corner Plot" },
  { label: "Dead-End Plot", value: "Dead-End Plot" },
];
