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
import {
  Headphones,
  Mail,
  Phone,
  CircleHelp as HelpCircle,
  Users,
} from "lucide-react";
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import { createSupportQuery } from "../../api/support";
import { faqs, supportOptions } from "@/lib/siteContent";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  phone: Yup.string().max(10, "Invalid phone").required("Phone required"),
  subject: Yup.string().required("Subject required"),
  message: Yup.string()
    .max(1500, "Max 1500 characters")
    .required("Message required"),
});

export default function SupportView() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      phone: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await createSupportQuery(values);

        toast({
          title: "Submitted ✅",
          description: "Your support request has been sent successfully.",
        });

        resetForm();
      } catch (err: any) {
        toast({
          title: "Failed ❌",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    formik;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Headphones className="h-8 w-8 sm:h-12 sm:w-12 mr-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Support Center
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We&#39;re here to help you with any questions about property
            valuation, bank-seized properties, and our services.
            {/* We&#39;re here to help you with any questions about property
            valuation and our services. */}
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-base sm:text-xl text-slate-600">
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
                    <h3 className="text-xl font-semibold text-slate-800">
                      {option.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {option.description}
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
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

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              Send Us Your Query
            </h2>
            <p className="text-base sm:text-xl text-slate-600">
              Fill out the form below and we&#39;ll get back to you within 4
              hours
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {touched.firstName && errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {touched.lastName && errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-slate-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="div">
                    <Label htmlFor="phone" className="text-slate-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500"
                      value={values.phone}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-slate-700">
                    Subject *
                  </Label>
                  <Select
                    onValueChange={(val) => setFieldValue("subject", val)}
                  >
                    <SelectTrigger className="mt-1 h-12 border-2 border-slate-200 focus:border-emerald-500">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Property Valuation Help">
                        Property Valuation Help
                      </SelectItem>
                      <SelectItem value="Bank-Seized Property Help">
                        Bank-Seized Property Help
                      </SelectItem>
                      <SelectItem value="Bank-Seized Property Listing Issue">
                        Bank-Seized Property Listing Issue
                      </SelectItem>
                      <SelectItem value="Technical Support">
                        Technical Support
                      </SelectItem>
                      <SelectItem value="Billing & Payments">
                        Billing & Payments
                      </SelectItem>
                      <SelectItem value="Account Issues">
                        Account Issues
                      </SelectItem>
                      <SelectItem value="feedback">
                        Feedback & Suggestions
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {touched.subject && errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-700">
                    Queries Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question in detail..."
                    rows={6}
                    className="mt-1 border-2 border-slate-200 focus:border-emerald-500 resize-none"
                    value={values.message}
                    onChange={handleChange}
                  />
                  {touched.message && errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? "Submitting..." : "Send Queries"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-xl text-slate-600">
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
                  <p className="text-slate-600">info@assetory.in</p>
                </div>
                <div>
                  <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-2">Call Us</h4>
                  <p className="text-slate-600">+91 78782 83414</p>
                </div>
                <div>
                  <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Visit Us
                  </h4>
                  <p className="text-slate-600">Surat, Gujarat</p>
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
