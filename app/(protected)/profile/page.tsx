"use client";

import { useContext } from "react";
import { UserContext } from "@/components/authentication/UserProvider";
import {
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Crown,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DASHBOARD_ROLES } from "@/lib/constant";

export default function ProfilePage() {
  const { userData, loading } = useContext(UserContext)!;
  const router = useRouter();

  if (loading || !userData) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        {/* <Loader className="animate-spin" /> */}
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
      </div>
    );
  }

  const subscription = userData?.subscriptions_id;

  return (
    <div className="w-full">
      <Header />

      <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
        {/* -------------------- PAGE TITLE -------------------- */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 text-center">
            My Profile
          </h1>
          <p className="text-center text-slate-500">
            Manage your personal information and subscription details
          </p>
        </div>

        {/* -------------------- GRID LAYOUT -------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT SIDE — USER INFO */}
          <div className="lg:col-span-1 space-y-6">
            {/* USER CARD */}
            <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl font-bold">
                  {userData?.name?.[0]?.toUpperCase()}
                </div>

                <h2 className="mt-4 text-xl font-semibold text-slate-800">
                  {userData?.name}
                </h2>

                <p className="text-slate-500 text-sm">{userData?.role}</p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3 text-slate-700">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <span>{userData?.phone}</span>
                </div>

                <div className="flex items-center space-x-3 text-slate-700">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <span>{userData?.email}</span>
                </div>

                <div className="flex items-center space-x-3 text-slate-700">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span>
                    {userData?.is_verified
                      ? "Verified Account"
                      : "Not Verified"}
                  </span>
                </div>
              </div>
            </div>

            {/* ACCOUNT STATUS */}
            <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold mb-4">Account Status</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <p className="text-slate-700">
                    Active: {userData?.is_active ? "Yes" : "No"}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {userData?.is_new ? (
                    <Crown className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                  <p className="text-slate-700">
                    {userData?.is_new ? "New User" : "Returning User"}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-rose-500" />
                  <p className="text-slate-700">
                    Reports Left: {userData?.no_of_report}
                  </p>
                </div>
              </div>
            </div>
            {DASHBOARD_ROLES.includes(userData.role) && (
              <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold mb-4">
                  Login to Dashboard
                </h3>
                <Button
                  onClick={() => router.push("/admin")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition"
                >
                  Go to Admin Dashboard
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT SIDE — SUBSCRIPTION INFO */}
          <div className="lg:col-span-2 space-y-6">
            {/* SUBSCRIPTION CARD */}
            <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200 h-full">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-emerald-600" />
                <span>Subscription Plan</span>
              </h3>

              {subscription ? (
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">Plan Name: </span>
                    {subscription.plan_name}
                  </p>
                  <p>
                    <span className="font-semibold">Plan No: </span>
                    {subscription.plan_no}
                  </p>
                  <p>
                    <span className="font-semibold">Price: </span>₹{" "}
                    {subscription.per_report_price}
                  </p>
                  <p>
                    <span className="font-semibold">Reports Included: </span>
                    {subscription.no_of_report}
                  </p>
                  <p>
                    <span className="font-semibold">Discount: </span>
                    {subscription.discount}% Off
                  </p>
                  <p>
                    <span className="font-semibold">Expires On: </span>
                    {new Date(
                      userData.subscriptions_expire
                    ).toLocaleDateString()}
                  </p>

                  {/* FEATURES */}
                  <div className="mt-4">
                    <h4 className="font-bold text-slate-700 mb-2">Features</h4>
                    <ul className="list-disc ml-6 text-slate-600">
                      {subscription.specification.map(
                        (spec: string, i: number) => (
                          <li key={i}>{spec}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500">No active subscription found.</p>
              )}
            </div>

            {/* MODULE PERMISSIONS */}
            <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Assigned Modules
              </h3>

              <div className="flex flex-wrap gap-3">
                {userData?.permissions?.map((mod: string) => (
                  <span
                    key={mod}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium text-sm"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
