"use client";

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
import { MapPin } from "lucide-react";
import FaqAccordion from "@/components/common/FaqAccordion";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { sendContactMessage } from "@/app/api/contact";
import { contactInfo, supportOptions } from "@/lib/siteContent";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Assetory",
  url: `${SITE_URL}/contact`,
  description:
    "Get in touch with Assetory for property valuation and auction property support, demos, and partnerships in India.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/contact`,
  },
  potentialAction: {
    "@type": "CommunicateAction",
    target: "mailto:info@assetory.in",
    name: "Send an email to Assetory",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+919876543210",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
      email: "info@assetory.in",
    },
  ],
};

export default function ContactView() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubjectChange = (value: string) => {
    setForm({ ...form, subject: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await sendContactMessage(form);

      toast({
        title: "Message Sent ✅",
        description:
          "Thank you for contacting us. We'll get back to you shortly.",
      });

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      toast({
        title: "Failed ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <Script
        id="contact-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {/* Have questions about property valuation or auction properties? We’re
            here to help you make informed real estate decisions. */}
            Have questions about property valuation? We&apos;re here to help you
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
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                        value={form.firstName}
                        onChange={handleChange}
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
                        value={form.lastName}
                        onChange={handleChange}
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
                      value={form.email}
                      onChange={handleChange}
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
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-slate-700">
                      Subject *
                    </Label>
                    <Select onValueChange={handleSubjectChange}>
                      <SelectTrigger className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="valuation">
                          Property Valuation
                        </SelectItem>
                        {/* <SelectItem value="auction">
                          Auction Property
                        </SelectItem> */}
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
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                  Get in Touch
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {/* Whether you need help with property valuation, auction
                  properties, have technical questions, or want to explore
                  business opportunities, our team is ready to assist you. */}
                  Whether you need help with property valuation, have technical
                  questions, or want to explore business opportunities, our team
                  is ready to assist you.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card
                      key={index}
                      className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                    >
                      <CardContent className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {" "}
                          <Icon className={`h-6 w-6 ${info.colorClass}`} />
                        </div>
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-3">
              Other Ways to Reach Us
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the support option that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <Icon className={`h-8 w-8 ${option.colorClass}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {option.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {option.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600"
                      onClick={() => {
                        if (option.type === "faq") {
                          document
                            .getElementById("faq-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                        if (option.type === "calendly") {
                          window.open(
                            "https://calendly.com/solutionkmitjaydip/30min",
                            "_blank",
                          );
                        }
                        if (option.type === "call" && option.phone) {
                          window.location.href = `tel:${option.phone}`;
                        }
                      }}
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-3">
              Visit Our Office
            </h2>
            <p className="text-base sm:text-xl text-slate-600">
              Located in the heart of Surat&#39;s business district
            </p>
          </div>

          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="h-96 bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Interactive Map
                </h3>
                <p className="text-slate-600">Surat, Gujarat, 395003, India</p>
                <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <div id="faq-section" className="bg-white">
        <FaqAccordion
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions about our services"
        />
      </div>

      <Footer />
    </div>
  );
}
