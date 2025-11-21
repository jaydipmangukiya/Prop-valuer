"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerUser } from "../api/authService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { roleOptions } from "@/lib/constant";

const validationSchema = Yup.object({
  name: Yup.string().required("First name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "BROKER",
  // agreeToTerms: false,
};
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: typeof initialValues) => {
      setLoading(true);
      try {
        const res = await registerUser(values);

        toast({
          title: "Account Created Successfully ✅",
          description: "Welcome to PropValuer!",
        });

        globalThis?.window?.localStorage?.setItem(
          "registeredEmail",
          values.email
        );

        if (res) {
          router.push("/otp");
        }
      } catch (error: any) {
        toast({
          title: "Registration Failed ❌",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-2xl font-bold text-slate-800"
          >
            <Building2 className="h-8 w-8 text-emerald-600" />
            <span>PropValuer</span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800">
              Create Your Account
            </CardTitle>
            <p className="text-slate-600 mt-2">
              Join thousands of property owners
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-700">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="firstName"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="First name"
                    className="pl-10 h-12 border-2 border-slate-200 focus:border-emerald-500"
                  />
                </div>
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-2 border-slate-200 focus:border-emerald-500"
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="pl-10 h-12 border-2 border-slate-200 focus:border-emerald-500"
                  />
                </div>
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={values.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-12 border-2 border-slate-200 focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-700">
                  Select Role
                </Label>
                <select
                  id="role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  className="w-full h-12 border-2 border-slate-200 focus:border-emerald-500 rounded-md px-3 bg-white"
                >
                  {roleOptions.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && touched.role && (
                  <p className="text-red-500 text-sm">{errors.role}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  // checked={formData.agreeToTerms}
                  // onCheckedChange={(checked) =>
                  //   setFormData((prev) => ({
                  //     ...prev,
                  //     agreeToTerms: checked as boolean,
                  //   }))
                  // }
                />
                <Label htmlFor="terms" className="text-sm text-slate-600">
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                // disabled={!formData.agreeToTerms}
              >
                {loading ? "Create Account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
