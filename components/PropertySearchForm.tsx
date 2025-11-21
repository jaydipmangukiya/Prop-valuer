"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Chrome as Home, Ruler } from "lucide-react";
import { PropertyData } from "@/app/page";

interface PropertySearchFormProps {
  onSubmit: (data: PropertyData) => void;
}

export function PropertySearchForm({ onSubmit }: PropertySearchFormProps) {
  const [formData, setFormData] = useState<PropertyData>({
    location: "",
    propertyType: "",
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    age: 0,
    furnished: "",
    floor: 0,
    totalFloors: 0,
    amenities: [],
  });

  // Pre-fill form data if available (from URL params or props)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const location = urlParams.get("location");

    const type = urlParams.get("type");

    if (location || type) {
      setFormData((prev) => ({
        ...prev,

        location: location || prev.location,

        propertyType: type || prev.propertyType,
      }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.location && formData.propertyType && formData.area > 0) {
      onSubmit(formData);
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((a) => a !== amenity),
      }));
    }
  };

  const amenitiesList = [
    "Parking",
    "Gym",
    "Swimming Pool",
    "Security",
    "Power Backup",
    "Lift",
    "Garden",
    "Club House",
    "Children Play Area",
    "CCTV",
  ];

  return (
    <Card className="max-w-4xl mx-auto shadow-xl">
      <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-emerald-50">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Property Valuation Form
        </CardTitle>
        <p className="text-gray-600">
          Fill in your property details for accurate valuation
        </p>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Location Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-semibold">Location Details</h3>
            </div>

            <div>
              <Label htmlFor="location">Property Location *</Label>
              <Input
                id="location"
                placeholder="Enter city, area, or landmark"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="mt-1"
                required
              />
            </div>
          </div>

          {/* Property Type Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-5 w-5 text-emerald-700" />
              <h3 className="text-lg font-semibold">Property Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, propertyType: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="house">Independent House</SelectItem>
                    <SelectItem value="plot">Plot/Land</SelectItem>
                    <SelectItem value="office">Office Space</SelectItem>
                    <SelectItem value="shop">Shop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="furnished">Furnished Status</Label>
                <Select
                  value={formData.furnished}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, furnished: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select furnished status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fully-furnished">
                      Fully Furnished
                    </SelectItem>
                    <SelectItem value="semi-furnished">
                      Semi Furnished
                    </SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Area and Configuration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Ruler className="h-5 w-5 text-orange-700" />
              <h3 className="text-lg font-semibold">Size & Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="area">Area (sq ft) *</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Enter area"
                  value={formData.area || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      area: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select
                  value={formData.bedrooms.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      bedrooms: parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 BHK</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select
                  value={formData.bathrooms.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      bathrooms: parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="age">Property Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age in years"
                value={formData.age || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    age: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                placeholder="Floor number"
                value={formData.floor || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    floor: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="totalFloors">Total Floors</Label>
              <Input
                id="totalFloors"
                type="number"
                placeholder="Total floors"
                value={formData.totalFloors || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    totalFloors: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Amenities</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={(checked) =>
                      handleAmenityChange(amenity, checked as boolean)
                    }
                  />
                  <Label htmlFor={amenity} className="text-sm">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-emerald-700 hover:from-blue-800 hover:to-emerald-800 text-lg py-6"
            disabled={
              !formData.location || !formData.propertyType || formData.area <= 0
            }
          >
            Get Property Valuation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
