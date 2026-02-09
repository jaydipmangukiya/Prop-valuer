import {
  Search,
  FileText,
  Calculator,
  CircleCheck as CheckCircle,
  TrendingUp,
  Chrome as Home,
  MapPin,
  ChartBar as BarChart3,
  Shield,
  Building2,
  Users,
  Award,
  Clock,
  Mail,
  MessageSquare,
  Headphones,
  Database,
  UserCheck,
  Eye,
  Lock,
  TriangleAlert as AlertTriangle,
  Scale,
  Gavel,
  Download,
  Building,
  Landmark,
} from "lucide-react";

// ============================================================================
// Home Page
// ============================================================================

export const howItWorksSteps = [
  {
    icon: Search,
    title: "Enter Property Details",
    description:
      "Provide basic information about your property including location, type, and size",
  },
  {
    icon: FileText,
    title: "Add Specifications",
    description:
      "Include additional details like amenities, age, and condition for better accuracy",
  },
  {
    icon: Calculator,
    title: "AI Analysis",
    description:
      "Our advanced algorithms analyze market data and comparable properties",
  },
  {
    icon: CheckCircle,
    title: "Get Valuation",
    description:
      "Receive instant, accurate property valuation with detailed market insights",
  },
];

// export const marketInsightsData = [
//   {
//     location: "Vesu",
//     avgPrice: "₹7,200",
//     trend: "+9%",
//     trendUp: true,
//     icon: Home,
//   },
//   {
//     location: "Adajan",
//     avgPrice: "₹6,800",
//     trend: "+7%",
//     trendUp: true,
//     icon: MapPin,
//   },
//   {
//     location: "Mota Varachha",
//     avgPrice: "₹5000",
//     trend: "+12%",
//     trendUp: true,
//     icon: TrendingUp,
//   },
//   {
//     location: "Pal",
//     avgPrice: "₹5,600",
//     trend: "+6%",
//     trendUp: true,
//     icon: BarChart3,
//   },
// ];

export const marketInsightsData = [
  {
    type: "valuation",
    location: "Vesu",
    avgPrice: "₹7,200",
    trend: "+9%",
    trendUp: true,
    icon: Home,
  },
  {
    type: "valuation",
    location: "Adajan",
    avgPrice: "₹6,800",
    trend: "+7%",
    trendUp: true,
    icon: MapPin,
  },
  {
    type: "auction",
    location: "Mota Varachha",
    icon: Gavel,
  },
  {
    type: "auction",
    location: "Pal",
    icon: BarChart3,
  },
];

// ============================================================================
// Contact Page
// ============================================================================

export const contactFaqs = [
  {
    question: "How accurate are your property valuations?",
    answer:
      "Our AI-powered valuations have a 95% accuracy rate, validated against actual market transactions and expert assessments.",
  },
  {
    question: "Do you provide auction property details and analysis?",
    answer:
      "Yes. Asstory provides verified auction property listings along with insights to help buyers evaluate risks and opportunities before bidding.",
  },
  {
    question: "Is auction property valuation different from normal valuation?",
    answer:
      "Yes. Auction properties require additional checks such as legal status, reserve price, and risk assessment, which Asstory helps you understand clearly.",
  },
  {
    question: "How long does it take to get a valuation report?",
    answer:
      "Basic property valuations are instant. Detailed reports with market analysis are generated within 24 hours.",
  },
  {
    question: "Do you cover all cities in Gujarat?",
    answer:
      "No. Currently, our services are available only in 2–3 selected cities in Gujarat. We are actively working on expanding to more cities once reliable data coverage is ensured.",
  },
  {
    question: "Is my property information secure?",
    answer:
      "Yes, we use bank-level encryption and security measures to protect all your property and personal information.",
  },
];

export const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    details: ["Surat, Gujarat, 395003", "India"],
    colorClass: "text-emerald-600",
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["info@asstory.in"],
    colorClass: "text-orange-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Monday - Friday: 9:00 AM - 7:00 PM",
      "Saturday: 10:00 AM - 5:00 PM",
      "Sunday: Closed",
    ],
    colorClass: "text-purple-600",
  },
];

export const supportOptions = [
  {
    icon: Headphones,
    title: "Phone Support",
    description: "Speak directly with our experts",
    action: "Call Now",
    colorClass: "text-blue-600",
    type: "call",
    phone: "+91 78782 83414",
  },
  {
    icon: FileText,
    title: "Help Center",
    description: "Browse our comprehensive FAQ section",
    action: "View FAQs",
    colorClass: "text-orange-600",
    type: "faq",
  },
  {
    icon: Users,
    title: "Schedule Meeting",
    description: "Book a consultation with our team",
    action: "Book Now",
    colorClass: "text-purple-600",
    type: "calendly",
  },
];

// ============================================================================
// Support Page
// ============================================================================

export const faqs = [
  {
    question: "How accurate are your property valuations?",
    answer:
      "Our AI-powered valuations have a 95% accuracy rate, validated against actual market transactions and expert assessments. We continuously update our algorithms with the latest market data.",
  },
  {
    question: "How long does it take to get a valuation report?",
    answer:
      "Basic property valuations are instant. Detailed PDF reports with comprehensive market analysis are generated within 2-3 minutes of form submission.",
  },
  {
    question: "Can I get valuations for commercial properties?",
    answer:
      "Yes, we provide valuations for both residential and commercial properties including offices, retail spaces, warehouses, and industrial properties.",
  },
  {
    question: "Do you cover all cities in Gujarat?",
    answer:
      "No. Currently, our services are available only in 2–3 selected cities in Gujarat. We are actively working on expanding to more cities once reliable data coverage is ensured.",
  },
  {
    question: "Is my property information secure?",
    answer:
      "Absolutely. We use bank-level encryption and security measures to protect all your property and personal information. Your data is never shared with third parties.",
  },
  {
    question: "Can I download my valuation report?",
    answer:
      "Yes, all valuation reports are available as downloadable PDFs with detailed analysis, comparable properties, and market insights.",
  },
  {
    question: "Do you provide support for auction properties?",
    answer:
      "Yes. Asstory helps users discover verified auction properties and provides guidance on auction listings, risks, and valuation insights.",
  },
  {
    question: "Does Asstory verify auction property listings?",
    answer:
      "We source auction listings from trusted public and institutional channels. While legal due diligence should be done by buyers, we ensure data accuracy and transparency.",
  },
];

// ============================================================================
// Services Page
// ============================================================================

export const ourProcess = [
  {
    step: "1",
    title: "Property Details",
    description:
      "Provide basic information about your property including location, type, and specifications",
  },
  {
    step: "2",
    title: "AI Analysis",
    description:
      "Our advanced algorithms analyze market data, comparable sales, and location factors",
  },
  {
    step: "3",
    title: "Expert Review",
    description:
      "Real estate experts validate the AI results for maximum accuracy",
  },
  {
    step: "4",
    title: "Detailed Report",
    description:
      "Receive comprehensive valuation report with market insights and recommendations",
  },
];

// export const additionalServices = [
//   {
//     icon: TrendingUp,
//     title: "Market Analysis Reports",
//     description:
//       "Comprehensive market trends and investment opportunities in your area",
//   },
//   {
//     icon: FileText,
//     title: "Property Documentation",
//     description:
//       "Legal document verification and property title analysis services",
//   },
//   {
//     icon: Calculator,
//     title: "Investment Advisory",
//     description:
//       "Expert guidance on property investment decisions and portfolio optimization",
//   },
//   {
//     icon: Shield,
//     title: "Property Insurance Valuation",
//     description:
//       "Accurate property valuation for insurance claims and coverage assessment",
//   },
// ];

export const additionalServices = [
  {
    icon: FileText,
    title: "Asstory Market Reports",
    description:
      "Quick and accurate property valuation based on market data analysis and comparable properties.",
  },
  {
    icon: BarChart3,
    title: "Market Analysis",
    description:
      "Comprehensive analysis of local market trends, pricing patterns, and property demand.",
  },
  {
    icon: Download,
    title: "Bank-Grade PDF Reports",
    description:
      "Professional valuation reports accepted by banks, legal entities, and financial institutions.",
  },
  {
    icon: Building,
    title: "Residential & Commercial",
    description:
      "Complete support for residential, commercial, and mixed-use property valuations.",
  },
];

export const auctionServices = [
  {
    icon: Gavel,
    title: "Bank Auction Discovery",
    description:
      "Access to curated bank auction properties with verified documentation and ownership details.",
  },
  {
    icon: Search,
    title: "Seized Asset Listings",
    description:
      "Browse distressed and bank-seized properties with transparent auction schedules.",
  },
  {
    icon: TrendingUp,
    title: "Valuation Comparison",
    description:
      "Compare auction reserve prices against market valuations to identify opportunities.",
  },
  {
    icon: Shield,
    title: "Investment Insights",
    description:
      "Data-driven insights to help you make informed investment decisions.",
  },
];

// ============================================================================
// About Page
// ============================================================================

export const teamMember = [
  {
    name: "Jay Pagada",
    role: "CEO & Founder",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Visionary leader with 10+ years in real estate tech",
  },
  {
    name: "Brijesh Movaliya",
    role: "CTO & Co-Founder",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Expert in scalable web architectures",
  },
  {
    name: "Jaydip Mangukiya",
    role: "Head of Data Science",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "AI specialist with a focus on real estate analytics",
  },
  {
    name: "Kirit Patel",
    role: "Advisory Board Member",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Real Estate Investor & Mentor",
  },
];

export const stats = [
  {
    value: "1K+",
    label: "Properties Valued",
  },
  {
    value: "95%",
    label: "Accuracy Rate",
  },
  {
    value: "30+",
    label: "Partner Institutions",
  },
  {
    value: "5+",
    label: "Years Experience",
  },
];

export const features = [
  {
    icon: Shield,
    title: "Trusted & Secure",
    description:
      "Your data is protected with bank-level security. We ensure complete privacy and confidentiality of your property information.",
    colorClass: "text-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description:
      "Our AI-powered algorithms analyze millions of data points including recent sales, market trends, and location factors.",
    colorClass: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description:
      "Get comprehensive property valuation reports in seconds, not days. No waiting, no delays, just accurate results.",
    colorClass: "text-orange-600",
  },
];

// ============================================================================
// Privacy-Policy Page
// ============================================================================

export const privacySections = [
  {
    icon: Eye,
    title: "Information We Collect",
    colorClass: "text-emerald-600",
    content: [
      "Personal Information: Name, email address, phone number, and contact details when you register or use our services.",
      "Property Information: Property details, location, specifications, and images you provide for valuation purposes.",
      "Usage Data: Information about how you use our website, including IP address, browser type, pages visited, and time spent on our site.",
      "Cookies and Tracking: We use cookies and similar technologies to enhance your experience and analyze website usage.",
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    colorClass: "text-blue-600",
    content: [
      "Provide accurate property valuation services and generate detailed reports.",
      "Communicate with you about our services, updates, and promotional offers.",
      "Improve our website functionality and user experience.",
      "Comply with legal obligations and protect against fraudulent activities.",
      "Analyze market trends and enhance our valuation algorithms.",
    ],
  },
  {
    icon: Lock,
    title: "Information Security",
    colorClass: "text-orange-600",
    content: [
      "We implement industry-standard security measures to protect your personal information.",
      "All data transmission is encrypted using SSL/TLS protocols.",
      "Access to your information is restricted to authorized personnel only.",
      "Regular security audits and updates are conducted to maintain data protection.",
      "We do not store sensitive financial information on our servers.",
    ],
  },
  {
    icon: UserCheck,
    title: "Information Sharing",
    colorClass: "text-purple-600",
    content: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "Information may be shared with trusted service providers who assist in our operations.",
      "We may disclose information when required by law or to protect our rights.",
      "Anonymous, aggregated data may be used for research and market analysis.",
      "Your consent will be obtained before sharing information for any other purpose.",
    ],
  },
];

// ============================================================================
// Terms Page
// ============================================================================

export const termsSections = [
  {
    icon: Users,
    title: "User Responsibilities",
    colorClass: "text-emerald-600",
    content: [
      "Provide accurate and complete property information for valuation or auction-related purposes.",
      "Use the service only for legitimate property valuation and auction discovery needs.",
      "Conduct independent legal, financial, and technical due diligence before purchasing or bidding on any property.",
      "Maintain the confidentiality of your account credentials.",
      "Comply with all applicable laws and regulations when using our services.",
      "Not attempt to reverse engineer, manipulate, or misuse our valuation models or auction data.",
    ],
  },
  {
    icon: Shield,
    title: "Service Limitations",
    colorClass: "text-blue-600",
    content: [
      "Valuations are estimates based on available data, algorithms, and market analysis.",
      "Auction property information is provided for informational purposes only and may change without notice.",
      "We do not guarantee the accuracy, completeness, or legal status of third-party or auction data sources.",
      "Property values and auction conditions may fluctuate due to market forces, regulatory changes, or seller actions.",
      "Our services do not replace professional appraisal, legal advice, or independent verification.",
      "We reserve the right to refuse, modify, or discontinue services for any property, listing, or location.",
    ],
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    colorClass: "text-orange-600",
    content: [
      "All content, algorithms, and technology are proprietary to Asstory.",
      "Users may not copy, scrape, redistribute, or commercially exploit valuation reports or auction data without written permission.",
      "Our trademarks, logos, and brand elements are protected intellectual property.",
      "User-generated content remains the property of the user but grants us usage rights.",
      "We respect third-party intellectual property rights and expect users to do the same.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Liability and Disclaimers",
    colorClass: "text-red-600",
    content: [
      "Asstory provides valuation insights and auction property information for informational purposes only.",
      "We are not liable for decisions, bids, purchases, or investments made based on valuation reports or auction listings.",
      "We do not guarantee auction outcomes, property title clearance, possession status, or legal compliance.",
      "All services are provided on an 'as-is' and 'as-available' basis without warranties of any kind.",
      "Our total liability, if any, is limited to the amount paid for the specific service used.",
      "Users assume full responsibility for property-related decisions, risks, and outcomes.",
    ],
  },
];

export const benefits = [
  {
    icon: FileText,
    title: "Bank-Grade PDF Reports",
    description:
      "Professional reports accepted by all major financial institutions for lending and mortgage purposes.",
  },
  {
    icon: TrendingUp,
    title: "RV & DV Insights",
    description:
      "Get both Rateable Value and Desktop Valuation insights for comprehensive property understanding.",
  },
  {
    icon: BarChart3,
    title: "Market Analysis",
    description:
      "Detailed market trends and comparable property analysis to support your valuation.",
  },
  {
    icon: Shield,
    title: "Trusted & Compliant",
    description:
      "Valuations that meet regulatory standards and are trusted for legal and compliance purposes.",
  },
];

export const valuationTypes = [
  {
    icon: Home,
    title: "Residential Valuation",
    description:
      "Accurate market valuation for houses, apartments, and residential properties.",
    features: [
      "Market comparison analysis",
      "Location-based insights",
      "Bank-ready reports",
    ],
  },
  {
    icon: Building,
    title: "Commercial Valuation",
    description:
      "Professional valuation for office spaces, retail, and commercial real estate.",
    features: [
      "Income capitalization method",
      "Rental yield analysis",
      "Investment grade reports",
    ],
  },
  {
    icon: Building2,
    title: "Industrial Valuation",
    description:
      "Specialized valuation for warehouses, factories, and industrial facilities.",
    features: [
      "Asset-based valuation",
      "Depreciation analysis",
      "Compliance documentation",
    ],
  },
  {
    icon: Landmark,
    title: "Land Valuation",
    description:
      "Comprehensive land valuation for development and investment purposes.",
    features: [
      "Zoning analysis",
      "Development potential",
      "Comparable sales data",
    ],
  },
];
