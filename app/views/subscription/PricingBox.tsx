"use client";

import { CheckCircle, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

export default function PricingBox({
  packageName,
  price,
  duration,
  children,
  title,
  onClick,
  isActive,
  noOfReport,
  discount,
}: {
  price: number;
  duration: string;
  packageName: string;
  children?: React.ReactNode;
  title: string;
  onClick: () => void;
  isActive?: boolean;
  noOfReport: number;
  discount: number;
}) {
  const roundedPrice = Math.round(price);
  const isPopular = discount >= 30;

  return (
    <div className="w-full h-full">
      <Card
        className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg ${
          isPopular ? "ring-2 ring-emerald-500" : ""
        }`}
      >
        {isPopular && (
          <Badge className="absolute top-4 right-4 bg-emerald-600 hover:bg-emerald-700">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )}
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-xl mb-2">{packageName}</CardTitle>
          <p className="text-slate-600 text-sm">
            {noOfReport} Reports · {discount}% Off
          </p>
          <div className="text-3xl font-bold text-emerald-600 mt-4">
            ₹{roundedPrice}
            <span className="text-sm text-slate-500 ml-1">/{duration}</span>
          </div>
          {isActive && (
            <p className="text-green-600 text-sm font-semibold mt-1">
              (Active Plan)
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <li className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <span className="text-slate-700 text-sm">
              {noOfReport} Reports Included
            </span>
          </li>

          <li className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <span className="text-slate-700 text-sm">
              {discount}% Discount on each report
            </span>
          </li>

          <li className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <span className="text-slate-700 text-sm">
              Dedicated support included
            </span>
          </li>
          <Button
            onClick={onClick}
            className={`w-full h-12 font-semibold rounded-xl transition-all duration-300 ${
              isPopular
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl"
                : "bg-slate-100 hover:bg-slate-200 text-slate-800"
            }`}
          >
            {title}
          </Button>
        </CardContent>
        <div className="mt-6">{children}</div>
      </Card>
    </div>
  );
}
