"use client";

import { SearchBar } from "@/components/SearchBar";
import { MarketInsights } from "@/components/MarketInsights";
import { HowItWorks } from "@/components/HowItWorks";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { FeaturedProperties } from "@/components/FeaturedProperties";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SearchBar />
      </div>
      <FeaturedProperties />
      <HowItWorks />
      <MarketInsights />
      <Footer />
    </div>
  );
}
