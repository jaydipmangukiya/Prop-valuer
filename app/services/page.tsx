import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Chrome as Home,
  MapPin,
  TrendingUp,
  FileText,
  Calculator,
  Shield,
  Clock,
  CircleCheck as CheckCircle,
  Star,
} from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  const services = [
    {
      icon: <Building2 className="h-12 w-12 text-emerald-600" />,
      title: "Residential Property Valuation",
      description:
        "Accurate valuation for apartments, villas, independent houses, and plots",
      features: [
        "Instant AI-powered analysis",
        "Market comparison reports",
        "Price trend analysis",
        "Investment recommendations",
      ],
      price: "Free",
      popular: false,
    },
    {
      icon: <Home className="h-12 w-12 text-blue-600" />,
      title: "Commercial Property Valuation",
      description:
        "Professional valuation for offices, retail spaces, warehouses, and commercial plots",
      features: [
        "Rental yield analysis",
        "Commercial market insights",
        "Investment grade reports",
        "ROI calculations",
      ],
      price: "₹999",
      popular: true,
    },
    {
      icon: <MapPin className="h-12 w-12 text-orange-600" />,
      title: "Bulk Property Valuation",
      description:
        "Enterprise solution for multiple properties with detailed analytics",
      features: [
        "Portfolio analysis",
        "Bulk upload facility",
        "Custom reporting",
        "API integration",
      ],
      price: "Custom",
      popular: false,
    },
  ];

  const additionalServices = [
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-600" />,
      title: "Market Analysis Reports",
      description:
        "Comprehensive market trends and investment opportunities in your area",
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Property Documentation",
      description:
        "Legal document verification and property title analysis services",
    },
    {
      icon: <Calculator className="h-8 w-8 text-orange-600" />,
      title: "Investment Advisory",
      description:
        "Expert guidance on property investment decisions and portfolio optimization",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Property Insurance Valuation",
      description:
        "Accurate property valuation for insurance claims and coverage assessment",
    },
  ];

  const process = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive property valuation and real estate services powered by
            AI and expert analysis
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Valuation Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the right valuation service for your property needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg ${
                  service.popular ? "ring-2 ring-emerald-500" : ""
                }`}
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-emerald-600 hover:bg-emerald-700">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <CardTitle className="text-xl mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-slate-600 text-sm">
                    {service.description}
                  </p>
                  <div className="text-3xl font-bold text-emerald-600 mt-4">
                    {service.price}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full h-12 font-semibold rounded-xl transition-all duration-300 ${
                      service.popular
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-1">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive real estate solutions beyond property valuation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardContent className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple, transparent, and accurate - here&#39;s how we value your
              property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">
                  {step.step}
                </div>

                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-200 to-transparent -translate-x-8"></div>
                )}

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Why Our Services Stand Out
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Instant Results
                    </h3>
                    <p className="text-slate-600">
                      Get property valuations in seconds, not days or weeks
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      95% Accuracy
                    </h3>
                    <p className="text-slate-600">
                      Industry-leading accuracy backed by comprehensive data
                      analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Market Insights
                    </h3>
                    <p className="text-slate-600">
                      Detailed market analysis and investment recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[100px]">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Property analysis dashboard"
                fill
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose the service that best fits your needs and get accurate
            property valuation today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Free Valuation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
