import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Chrome as Home,
  Ruler,
  Loader2,
  Building2,
} from "lucide-react";
import Image from "next/image";
import { getReports, ValuationReport } from "@/app/api/valuationService";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatPriceINR } from "@/lib/utils";

export function FeaturedProperties() {
  const [properties, setProperties] = useState<ValuationReport[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    setLoading(true);
    try {
      // ONLY 4 records for website
      const res = await getReports(4, 0);
      setProperties(res?.allReport || []);
    } catch (err: any) {
      toast({
        title: "Failed to load reports ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Recently Valued Properties
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore properties that have been recently valued on our platform
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-slate-600">Loading Properties...</p>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <Building2 className="h-10 w-10 mb-2" />
            <p> No properties available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.slice(0, 4).map((property) => (
              <Card
                key={property._id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={
                      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    alt={property.property_address}
                    fill
                    className="object-cover rounded-lg"
                  />

                  <Badge className="absolute top-3 right-3 bg-emerald-600 hover:bg-emerald-700">
                    Valued
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                    {property.property_address}
                  </h3>

                  <div className="flex items-center text-slate-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.nearest_landmark}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-slate-600">
                      <Home className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {property.type_of_property}f
                      </span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Ruler className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {" "}
                        {property.built_up_area_carpet_area_super_built_up_area ||
                          0}
                        sq ft
                      </span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-emerald-600">
                    {formatPriceINR(property.final_valuation)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProperties;
