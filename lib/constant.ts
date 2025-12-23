export const rowPerPage = 10;

export const roleOptions = [
  { label: "Valuer", value: "VALUER" },
  { label: "Banker", value: "BANKER" },
  { label: "Broker", value: "BROKER" },
  { label: "Individual", value: "INDIVIDUAL" },
];

export const DASHBOARD_ROLES = ["SUPER_ADMIN", "MANAGER", "VALUER"];

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
