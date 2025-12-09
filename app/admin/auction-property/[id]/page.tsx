"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Calendar,
  Landmark,
  MapPin,
  IndianRupee,
  Hash,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { getAuctionPropertyById } from "@/app/api/auctionProperty";
import PropertyImageSlider from "@/app/views/admin/Auction-Property/PropertyImageSlider/PropertyImageSlider";

export default function AuctionPropertyDetails({ params }: any) {
  const router = useRouter();
  const { id } = params;

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await getAuctionPropertyById(id);
      setProperty(res);
    } catch (error) {
      console.error("Failed loading:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin h-10 w-10 text-emerald-600" />
      </div>
    );

  if (!property)
    return (
      <div className="text-center text-red-600 text-xl py-20">
        Property not found.
      </div>
    );

  return (
    <div className="max-w-full mx-auto space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        ← Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{property.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* BASIC INFO GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            <Info label="Title" value={property.title} icon={<Hash />} />

            <Info
              label="Possession Status"
              value={property.possessionStatus || "—"}
              icon={<CheckCircle2 />}
            />

            <Info
              label="Action Type"
              value={property.actionType}
              icon={<Hash />}
            />

            <Info
              label="State"
              value={`${property.state} (ID: ${property.stateId})`}
              icon={<MapPin />}
            />

            <Info
              label="City"
              value={`${property.city} (ID: ${property.cityId})`}
              icon={<MapPin />}
            />

            <Info
              label="Bank Name"
              value={property.bankName}
              icon={<Landmark />}
            />

            <Info
              label="Reserve Price"
              value={`₹ ${property.price?.toLocaleString()}`}
              icon={<IndianRupee />}
            />

            <Info
              label="Property ID"
              value={property.propertyId || "Not Provided"}
              icon={<Hash />}
            />

            <Info
              label="Auction Start"
              value={formatDate(property.auctionStart)}
              icon={<Calendar />}
            />

            <Info
              label="Auction End"
              value={formatDate(property.auctionEnd)}
              icon={<Calendar />}
            />

            <Info
              label="EMD End"
              value={formatDate(property.emdEnd)}
              icon={<Calendar />}
            />

            <Info
              label="Active Status"
              value={property.is_active ? "Active" : "Inactive"}
              icon={
                property.is_active ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <XCircle className="text-red-600" />
                )
              }
            />

            <Info
              label="Created At"
              value={formatDate(property.createdAt)}
              icon={<Calendar />}
            />

            <Info
              label="Updated At"
              value={formatDate(property.updatedAt)}
              icon={<Calendar />}
            />
            <Info
              label="Pincode"
              value={property.pinCode || "—"}
              icon={<Hash />}
            />

            <Info
              label="Ownership of Property"
              value={property.ownershipOfProperty || "—"}
              icon={<Hash />}
            />

            <Info
              label="Property Address"
              value={property.propertyAddress || "—"}
              icon={<MapPin />}
            />

            <Info
              label="Ownership Type"
              value={property.ownershipType || "—"}
              icon={<Hash />}
            />

            <Info
              label="Co-Borrower Names"
              value={property.coBorrowerNames || "—"}
              icon={<Hash />}
            />

            <Info
              label="Registered Address of Borrower"
              value={property.registeredAddressOfBorrower || "—"}
              icon={<MapPin />}
            />

            <Info
              label="Borrower Name"
              value={property.borrowerName || "—"}
              icon={<Hash />}
            />

            <Info
              label="Title Deed Type"
              value={property.titleDeedType || "—"}
              icon={<Hash />}
            />

            <Info
              label="Nearest Transport Station"
              value={property.nearestTransportStation || "—"}
              icon={<MapPin />}
            />

            <Info label="USPs" value={property.usps || "—"} icon={<Hash />} />

            <Info
              label="Age of Construction"
              value={property.ageOfConstruction ?? "—"}
              icon={<Hash />}
            />

            <Info
              label="Nearby Educational Institutes"
              value={property.nearbyEducationalInstitutes || "—"}
              icon={<Hash />}
            />

            <Info
              label="Nearby Shopping Centers"
              value={property.nearbyShoppingCenters || "—"}
              icon={<Hash />}
            />

            <Info
              label="Nearby Localities"
              value={property.nearbyLocalities || "—"}
              icon={<MapPin />}
            />

            <Info
              label="Nearby Commercial Hub"
              value={property.nearbyCommercialHub || "—"}
              icon={<MapPin />}
            />

            <Info
              label="Facing"
              value={property.facing || "—"}
              icon={<Hash />}
            />
          </div>
          <div className="mb-6">
            <PropertyImageSlider images={property.images} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Info = ({ icon, label, value }: any) => (
  <div className="flex gap-3 items-start">
    <div className="text-emerald-600">{icon}</div>
    <div>
      <div className="text-sm text-slate-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

const formatDate = (date: string) =>
  date ? new Date(date).toLocaleString() : "—";
