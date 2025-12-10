/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Header from "@/components/Header";
import PropertyCard from "./List/PropertyCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
  AuctionProperty,
  getAuctionProperties,
} from "@/app/api/auctionProperty";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const PropertyauctionList = () => {
  const [items, setItems] = useState<AuctionProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await getAuctionProperties(20, 0);
      setItems(response?.data || []);
      setTotalProperties(response?.pagination?.totalCount || 0);
    } catch (err: any) {
      toast({
        title: "Failed to load properties ❌",
        description: err?.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Properties for Sale
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="h-6 w-6 text-emerald-600 animate-spin mr-2" />
          </div>
        )}
        {!loading && (
          <>
            {items.length > 0 ? (
              <>
                <p className="text-slate-600 mb-8">
                  Showing <strong>{totalProperties}</strong> results
                </p>

                <div className="space-y-8">
                  {items.map((item: any) => (
                    <PropertyCard key={item._id} data={item} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-slate-500 py-20 text-lg">
                No properties available.
              </div>
            )}
          </>
        )}

        {/* <div className="space-y-8">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};
export default PropertyauctionList;
