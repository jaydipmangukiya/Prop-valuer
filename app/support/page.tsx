import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Headphones,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CircleHelp as HelpCircle,
  FileText,
  Users,
  Zap,
  CircleCheck as CheckCircle,
} from "lucide-react";

export default function SupportPage() {
  const supportOptions = [
    {
      icon: <MessageSquare className="h-8 w-8 text-emerald-600" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      action: "Start Chat",
      response: "Immediate",
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Email Support",
      description: "Send us detailed queries via email",
      availability: "Always Open",
      action: "Send Email",
      response: "Within 4 hours",
    },
    {
      icon: <Phone className="h-8 w-8 text-orange-600" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Sat, 9 AM - 7 PM",
      action: "Call Now",
      response: "Immediate",
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Help Center",
      description: "Browse our comprehensive FAQ section",
      availability: "Always Available",
      action: "Browse FAQs",
      response: "Self-service",
    },
  ];

  const faqs = [
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
        "We currently cover 50+ major cities across India including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, and more. We're continuously expanding our coverage.",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Headphones className="h-12 w-12 mr-4" />
            <h1 className="text-5xl font-bold">Support Center</h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We&#39;re here to help you with any questions about property
            valuation and our services.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-slate-600">
              Choose the support option that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardContent className="space-y-4">
                  <div className="flex justify-center">{option.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {option.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{option.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>{option.availability}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-emerald-600">
                      <Zap className="h-4 w-4" />
                      <span>{option.response}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-slate-600">
              Fill out the form below and we&#39;ll get back to you within 4
              hours
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-slate-700">
                    Subject *
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valuation">
                        Property Valuation Help
                      </SelectItem>
                      <SelectItem value="technical">
                        Technical Support
                      </SelectItem>
                      <SelectItem value="billing">
                        Billing & Payments
                      </SelectItem>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="feedback">
                        Feedback & Suggestions
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question in detail..."
                    rows={6}
                    className="mt-1 border-2 border-slate-200 focus:border-emerald-500 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 border-0 shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <HelpCircle className="h-6 w-6 text-emerald-600 mt-1" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-3 text-lg">
                        {faq.question}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Mail className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Email Us
                  </h4>
                  <p className="text-slate-600">support@propvaluer.com</p>
                </div>
                <div>
                  <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-2">Call Us</h4>
                  <p className="text-slate-600">+91 98765 43210</p>
                </div>
                <div>
                  <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Visit Us
                  </h4>
                  <p className="text-slate-600">Mumbai, Maharashtra</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
