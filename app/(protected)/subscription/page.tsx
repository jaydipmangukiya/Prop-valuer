"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SubscriptionPlans from "@/app/views/subscription/SubscriptionPlans";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center my-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Valuation Subscription
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the right valuation service for your property needs
            </p>
          </div>

          <SubscriptionPlans />
        </div>
      </section>
      <Footer />
    </div>
  );
}
