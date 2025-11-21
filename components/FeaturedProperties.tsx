import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Chrome as Home, Ruler } from "lucide-react";
import Image from "next/image";

export function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Luxury Apartment in Bandra West",
      location: "Bandra West, Mumbai",
      price: "₹2.5 Cr",
      area: "1200 sq ft",
      type: "3 BHK",
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 2,
      title: "Modern Villa in Whitefield",
      location: "Whitefield, Bangalore",
      price: "₹1.8 Cr",
      area: "2500 sq ft",
      type: "4 BHK Villa",
      image:
        "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      title: "Premium Flat in Cyber City",
      location: "Gurgaon, Delhi NCR",
      price: "₹1.2 Cr",
      area: "950 sq ft",
      type: "2 BHK",
      image:
        "https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 4,
      title: "Spacious House in Jubilee Hills",
      location: "Jubilee Hills, Hyderabad",
      price: "₹95 L",
      area: "1800 sq ft",
      type: "3 BHK",
      image:
        "https://images.pexels.com/photos/1396128/pexels-photo-1396128.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <div className="relative w-full h-48">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover rounded-lg"
                />

                <Badge className="absolute top-3 right-3 bg-emerald-600 hover:bg-emerald-700">
                  Valued
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                  {property.title}
                </h3>

                <div className="flex items-center text-slate-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-slate-600">
                    <Home className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.type}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Ruler className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.area}</span>
                  </div>
                </div>

                <div className="text-2xl font-bold text-emerald-600">
                  {property.price}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProperties;
