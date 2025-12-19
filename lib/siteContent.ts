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

export const marketInsightsData = [
  {
    location: "Vesu",
    avgPrice: "₹7,200",
    trend: "+9%",
    trendUp: true,
    icon: Home,
  },
  {
    location: "Adajan",
    avgPrice: "₹6,800",
    trend: "+7%",
    trendUp: true,
    icon: MapPin,
  },
  {
    location: "Mota Varachha",
    avgPrice: "₹5000",
    trend: "+12%",
    trendUp: true,
    icon: TrendingUp,
  },
  {
    location: "Pal",
    avgPrice: "₹5,600",
    trend: "+6%",
    trendUp: true,
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
    question: "How long does it take to get a valuation report?",
    answer:
      "Basic property valuations are instant. Detailed reports with market analysis are generated within 24 hours.",
  },
  {
    question: "Do you cover all cities in India?",
    answer:
      "We currently cover 50+ major cities across India, with plans to expand to more locations soon.",
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
    details: [
      "info@propvaluer.com",
      "support@propvaluer.com",
      "sales@propvaluer.com",
    ],
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
    icon: MessageSquare,
    title: "Live Chat",
    description: "Get instant help from our support team",
    action: "Start Chat",
    colorClass: "text-emerald-600",
  },
  {
    icon: Headphones,
    title: "Phone Support",
    description: "Speak directly with our experts",
    action: "Call Now",
    colorClass: "text-blue-600",
  },
  {
    icon: FileText,
    title: "Help Center",
    description: "Browse our comprehensive FAQ section",
    action: "View FAQs",
    colorClass: "text-orange-600",
  },
  {
    icon: Users,
    title: "Schedule Meeting",
    description: "Book a consultation with our team",
    action: "Book Now",
    colorClass: "text-purple-600",
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
    question: "Do you cover all cities in India?",
    answer:
      "We currently cover 50+ major cities across India including Surat, Delhi, Bangalore, Hyderabad, Chennai, Pune, and more. We're continuously expanding our coverage.",
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

export const additionalServices = [
  {
    icon: TrendingUp,
    title: "Market Analysis Reports",
    description:
      "Comprehensive market trends and investment opportunities in your area",
  },
  {
    icon: FileText,
    title: "Property Documentation",
    description:
      "Legal document verification and property title analysis services",
  },
  {
    icon: Calculator,
    title: "Investment Advisory",
    description:
      "Expert guidance on property investment decisions and portfolio optimization",
  },
  {
    icon: Shield,
    title: "Property Insurance Valuation",
    description:
      "Accurate property valuation for insurance claims and coverage assessment",
  },
];

// ============================================================================
// About Page
// ============================================================================

export const teamMember = [
  {
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "15+ years in real estate and technology",
  },
  {
    name: "Priya Sharma",
    role: "Head of Data Science",
    image:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "PhD in Machine Learning, ex-Google",
  },
  {
    name: "Amit Patel",
    role: "VP Engineering",
    image:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Former CTO at leading PropTech companies",
  },
];

export const stats = [
  {
    icon: Building2,
    value: "50,000+",
    label: "Properties Valued",
  },
  {
    icon: Users,
    value: "25,000+",
    label: "Happy Customers",
  },
  {
    icon: Award,
    value: "95%",
    label: "Accuracy Rate",
  },
  {
    icon: TrendingUp,
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
      "Provide accurate and complete property information for valuation purposes.",
      "Use the service only for legitimate property valuation needs.",
      "Maintain the confidentiality of your account credentials.",
      "Comply with all applicable laws and regulations when using our services.",
      "Not attempt to reverse engineer or manipulate our valuation algorithms.",
    ],
  },
  {
    icon: Shield,
    title: "Service Limitations",
    colorClass: "text-blue-600",
    content: [
      "Valuations are estimates based on available data and market analysis.",
      "We do not guarantee the accuracy of third-party data sources.",
      "Property values may fluctuate due to market conditions.",
      "Our service is not a substitute for professional property appraisal.",
      "We reserve the right to refuse service for any property or location.",
    ],
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    colorClass: "text-orange-600",
    content: [
      "All content, algorithms, and technology are proprietary to PropValuer.",
      "Users may not copy, distribute, or reproduce our valuation reports for commercial purposes.",
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
      "PropValuer is not liable for decisions made based on our valuation reports.",
      "We disclaim all warranties, express or implied, regarding service accuracy.",
      "Our liability is limited to the amount paid for the specific service.",
      "We are not responsible for losses due to market fluctuations or external factors.",
      "Users assume full responsibility for their property investment decisions.",
    ],
  },
];
