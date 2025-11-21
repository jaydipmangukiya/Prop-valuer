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
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Headphones,
  FileText,
  Users,
} from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-emerald-600" />,
      title: "Office Address",
      details: ["123 Business District", "Mumbai, Maharashtra 400001", "India"],
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Phone Numbers",
      details: ["+91 98765 43210", "+91 98765 43211", "Mon-Sat: 9AM-7PM"],
    },
    {
      icon: <Mail className="h-6 w-6 text-orange-600" />,
      title: "Email Addresses",
      details: [
        "info@propvaluer.com",
        "support@propvaluer.com",
        "sales@propvaluer.com",
      ],
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 7:00 PM",
        "Saturday: 10:00 AM - 5:00 PM",
        "Sunday: Closed",
      ],
    },
  ];

  const supportOptions = [
    {
      icon: <MessageSquare className="h-8 w-8 text-emerald-600" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
    },
    {
      icon: <Headphones className="h-8 w-8 text-blue-600" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now",
    },
    {
      icon: <FileText className="h-8 w-8 text-orange-600" />,
      title: "Help Center",
      description: "Browse our comprehensive FAQ section",
      action: "View FAQs",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Schedule Meeting",
      description: "Book a consultation with our team",
      action: "Book Now",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Have questions about property valuation? We&#39;re here to help you
            make informed real estate decisions.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-800">
                  Send us a Message
                </CardTitle>
                <p className="text-slate-600">
                  Fill out the form below and we&#39;ll get back to you within
                  24 hours
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="phone" className="text-slate-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500"
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
                          Property Valuation
                        </SelectItem>
                        <SelectItem value="support">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="partnership">
                          Business Partnership
                        </SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
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
                      placeholder="Tell us how we can help you..."
                      rows={5}
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

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Whether you need help with property valuation, have technical
                  questions, or want to explore business opportunities, our team
                  is ready to assist you.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                  >
                    <CardContent className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{info.icon}</div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-slate-600 text-sm"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Other Ways to Reach Us
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
                  <h3 className="text-lg font-semibold text-slate-800">
                    {option.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{option.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600"
                  >
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-slate-600">
              Located in the heart of Mumbai&#39;s business district
            </p>
          </div>

          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="h-96 bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Interactive Map
                </h3>
                <p className="text-slate-600">
                  123 Business District, Mumbai, Maharashtra 400001
                </p>
                <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            {[
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
            ].map((faq, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md"
              >
                <CardContent>
                  <h3 className="font-semibold text-slate-800 mb-3 text-lg">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
