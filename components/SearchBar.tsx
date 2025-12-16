"use client";

import { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Suggestion {
  description: string;
  place_id: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [placeId, setPlaceId] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.google) return;

    if (searchQuery.length <= 2) {
      setSuggestions([]);
      return;
    }
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: searchQuery,
        componentRestrictions: { country: "in" },
      },
      (predictions: any[], status: string) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      }
    );
  }, [searchQuery]);

  const handleSelect = (item: Suggestion) => {
    setSearchQuery(item.description);
    setPlaceId(item.place_id);
    setSuggestions([]);
    localStorage.setItem("fullAddress", item.description);
  };

  const handleFinalSearch = () => {
    if (!placeId) {
      alert("Please enter a valid location");
      return;
    }
    router.push(`/confirm-location/${placeId}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Find Your Property Value
          </h2>
          <p className="text-slate-600 text-lg">
            Enter your property location to get started with free valuation
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Enter city, locality, or property name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPlaceId("");
                }}
                className="pl-12 h-14 text-lg border-2 border-slate-200 focus:border-emerald-500 rounded-xl"
              />
            </div>
            <Button
              onClick={handleFinalSearch}
              className="h-14 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Property
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10">
              {suggestions.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 flex items-center space-x-3"
                  onClick={() => handleSelect(item)}
                >
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-700">{item.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default SearchBar;
