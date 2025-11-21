import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Eye,
  Lock,
  Database,
  UserCheck,
  TriangleAlert as AlertTriangle,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Eye className="h-6 w-6 text-emerald-600" />,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and contact details when you register or use our services.",
        "Property Information: Property details, location, specifications, and images you provide for valuation purposes.",
        "Usage Data: Information about how you use our website, including IP address, browser type, pages visited, and time spent on our site.",
        "Cookies and Tracking: We use cookies and similar technologies to enhance your experience and analyze website usage.",
      ],
    },
    {
      icon: <Database className="h-6 w-6 text-blue-600" />,
      title: "How We Use Your Information",
      content: [
        "Provide accurate property valuation services and generate detailed reports.",
        "Communicate with you about our services, updates, and promotional offers.",
        "Improve our website functionality and user experience.",
        "Comply with legal obligations and protect against fraudulent activities.",
        "Analyze market trends and enhance our valuation algorithms.",
      ],
    },
    {
      icon: <Lock className="h-6 w-6 text-orange-600" />,
      title: "Information Security",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All data transmission is encrypted using SSL/TLS protocols.",
        "Access to your information is restricted to authorized personnel only.",
        "Regular security audits and updates are conducted to maintain data protection.",
        "We do not store sensitive financial information on our servers.",
      ],
    },
    {
      icon: <UserCheck className="h-6 w-6 text-purple-600" />,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "Information may be shared with trusted service providers who assist in our operations.",
        "We may disclose information when required by law or to protect our rights.",
        "Anonymous, aggregated data may be used for research and market analysis.",
        "Your consent will be obtained before sharing information for any other purpose.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 mr-4" />
            <h1 className="text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
          <p className="text-lg mt-4 opacity-90">
            Last updated: January 15, 2024
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                At PropValuer, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our property
                valuation services.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                By using our services, you agree to the collection and use of
                information in accordance with this policy. If you do not agree
                with our policies and practices, please do not use our services.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    {section.icon}
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <span>Your Rights and Choices</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Access and Update
                </h4>
                <p className="text-slate-700">
                  You have the right to access, update, or delete your personal
                  information at any time through your account settings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Data Portability
                </h4>
                <p className="text-slate-700">
                  You can request a copy of your data in a structured,
                  machine-readable format.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Marketing Communications
                </h4>
                <p className="text-slate-700">
                  You can opt-out of marketing communications at any time by
                  clicking the unsubscribe link in our emails.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2 text-slate-700">
                <p>
                  <strong>Email:</strong> privacy@propvaluer.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p>
                  <strong>Address:</strong> 123 Business District, Mumbai,
                  Maharashtra 400001, India
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
