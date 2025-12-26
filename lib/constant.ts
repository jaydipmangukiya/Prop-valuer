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
