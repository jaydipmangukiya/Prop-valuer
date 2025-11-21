import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Scale,
  Shield,
  TriangleAlert as AlertTriangle,
  Users,
  Gavel,
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      title: "User Responsibilities",
      content: [
        "Provide accurate and complete property information for valuation purposes.",
        "Use the service only for legitimate property valuation needs.",
        "Maintain the confidentiality of your account credentials.",
        "Comply with all applicable laws and regulations when using our services.",
        "Not attempt to reverse engineer or manipulate our valuation algorithms.",
      ],
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Service Limitations",
      content: [
        "Valuations are estimates based on available data and market analysis.",
        "We do not guarantee the accuracy of third-party data sources.",
        "Property values may fluctuate due to market conditions.",
        "Our service is not a substitute for professional property appraisal.",
        "We reserve the right to refuse service for any property or location.",
      ],
    },
    {
      icon: <Scale className="h-6 w-6 text-orange-600" />,
      title: "Intellectual Property",
      content: [
        "All content, algorithms, and technology are proprietary to PropValuer.",
        "Users may not copy, distribute, or reproduce our valuation reports for commercial purposes.",
        "Our trademarks, logos, and brand elements are protected intellectual property.",
        "User-generated content remains the property of the user but grants us usage rights.",
        "We respect third-party intellectual property rights and expect users to do the same.",
      ],
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
      title: "Liability and Disclaimers",
      content: [
        "PropValuer is not liable for decisions made based on our valuation reports.",
        "We disclaim all warranties, express or implied, regarding service accuracy.",
        "Our liability is limited to the amount paid for the specific service.",
        "We are not responsible for losses due to market fluctuations or external factors.",
        "Users assume full responsibility for their property investment decisions.",
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
            <FileText className="h-12 w-12 mr-4" />
            <h1 className="text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our property
            valuation services.
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
                Welcome to PropValuer. These Terms and Conditions
                (&quot;Terms&quot;) govern your use of our website and property
                valuation services. By accessing or using our services, you
                agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                If you do not agree with any part of these terms, please do not
                use our services. We reserve the right to update these Terms at
                any time, and continued use of our services constitutes
                acceptance of any changes.
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

      {/* Additional Terms */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Gavel className="h-6 w-6 text-purple-600" />
                <span>Payment and Billing Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Payment Processing
                </h4>
                <p className="text-slate-700">
                  All payments are processed securely through our trusted
                  payment partners. We accept major credit cards, debit cards,
                  and digital payment methods.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Billing Cycles
                </h4>
                <p className="text-slate-700">
                  Premium services are billed according to the selected plan.
                  Free services remain free with usage limitations as specified.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Price Changes
                </h4>
                <p className="text-slate-700">
                  We reserve the right to modify our pricing with 30 days
                  advance notice to existing users.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                Either party may terminate the service agreement at any time. We
                reserve the right to suspend or terminate accounts that violate
                these Terms or engage in fraudulent activities.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  Grounds for Termination
                </h4>
                <ul className="space-y-1 text-red-700 text-sm">
                  <li>• Violation of these Terms and Conditions</li>
                  <li>• Fraudulent or illegal use of our services</li>
                  <li>• Non-payment of premium service fees</li>
                  <li>• Abuse of our support systems or staff</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                These Terms are governed by the laws of India. Any disputes
                arising from the use of our services will be subject to the
                exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
              <div className="space-y-2 text-slate-700">
                <p>
                  <strong>Contact for Legal Matters:</strong>
                </p>
                <p>Email: legal@propvaluer.com</p>
                <p>
                  Address: 123 Business District, Mumbai, Maharashtra 400001,
                  India
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
