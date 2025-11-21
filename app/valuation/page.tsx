"use client";

import { useEffect, useState } from "react";
import { PropertySearchForm } from "@/components/PropertySearchForm";
import { ValuationResult } from "@/components/ValuationResult";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

export interface PropertyData {
  location: string;
  propertyType: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  age: number;
  furnished: string;
  floor: number;
  totalFloors: number;
  amenities: string[];
}

export default function ValuationPage() {
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Pre-fill form if coming from location confirmation

    const location = searchParams.get("location");

    const type = searchParams.get("type");

    if (location && type) {
      setPropertyData((prev) => ({
        ...prev,

        location,

        propertyType: type,

        area: 0,

        bedrooms: 0,

        bathrooms: 0,

        age: 0,

        furnished: "",

        floor: 0,

        totalFloors: 0,

        amenities: [],
      }));
    }
  }, [searchParams]);

  const handleFormSubmit = (data: PropertyData) => {
    setPropertyData(data);
    setShowResults(true);
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setPropertyData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <PropertySearchForm onSubmit={handleFormSubmit} />
        ) : (
          propertyData && (
            <ValuationResult
              propertyData={propertyData}
              onNewSearch={handleNewSearch}
            />
          )
        )}
      </div>
      <Footer />
    </div>
  );
}
