"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Navigation,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import MapComponent from "@/components/MapComponent";
import UnitsModal from "@/components/UnitModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LocationConfirmationPage({
  params,
}: {
  params: { placeId: string };
}) {
  const { placeId } = params;

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isDraggable, setIsDraggable] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectType, setSelectType] = useState<string | undefined>();
  const [fullAddress, setFullAddress] = useState("");

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!placeId) return;
    if (!window.google || !window.google.maps) return;

    geocodeByPlaceId(placeId)
      .then((results) => {
        setFullAddress(results[0]?.formatted_address || "");
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        setLatitude(lat);
        setLongitude(lng);
      })
      .catch((err) => console.error("PlaceId Error:", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId, typeof window !== "undefined" && window.google]);

  const handleOption = (type: string) => {
    if (type === "is_correct") {
      setSelectType(type);
      setOpen(true);
    } else if (type === "is_nearBy") {
      setSelectType(type);
      setOpen(true);
    } else {
      setSelectType("is_incorrect");
      alert("Drag the pin to the exact property location.");
      setIsDraggable(true);
    }
  };

  if (!latitude || !longitude) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading map...
      </div>
    );
  }

  //   const handleNext = () => {
  //     if (selectedPropertyType) {
  //       // Redirect to property details form with confirmed location and type
  //       route.push(
  //         `/valuation?location=${encodeURIComponent(
  //           locationData?.address || ""
  //         )}&type=${selectedPropertyType}`
  //       );
  //     }
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Search</span>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">
              Confirm Property Location
            </h1>
            <p className="text-slate-600">
              Please verify the location is correct
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span>Property Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[450px] w-full">
                <MapComponent
                  initialLatitude={latitude}
                  initialLongitude={longitude}
                  isDraggable={isDraggable}
                  setIsDraggable={setIsDraggable}
                  setOpen={setOpen}
                />
              </div>

              {/* Location Details */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">
                  PROPERTY ADDRESS AND UNIT DETAIL
                </h3>
                <p className="text-slate-600">{fullAddress}</p>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Section */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl">
                Is property coordinate correct?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  variant={"outline"}
                  className="w-full h-14 text-left justify-start bg-slate-100 hover:bg-slate-200 text-slate-700"
                  onClick={() => handleOption("is_correct")}
                >
                  <CheckCircle className="h-5 w-5 mr-3" />
                  Yes, It Is Correct
                </Button>

                <Button
                  variant={"outline"}
                  className={
                    "w-full h-14 text-left justify-start bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }
                  onClick={() => handleOption("is_nearBy")}
                >
                  <Navigation className="h-5 w-5 mr-3" />
                  Almost Near By
                </Button>

                <Button
                  variant={"outline"}
                  className="w-full h-14 text-left justify-start bg-slate-100 hover:bg-slate-200 text-slate-700"
                  onClick={() => handleOption("is_incorrect")}
                >
                  <AlertCircle className="h-5 w-5 mr-3" />
                  No, It Is Incorrect
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {open && (
          <UnitsModal
            open={open}
            handleClose={handleClose}
            latitude={latitude}
            longitude={longitude}
            selectType={selectType}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
