"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

type UnitsModalProps = {
  open: boolean;
  handleClose: (open: boolean) => void;
  latitude: number;
  longitude: number;
  selectType?: string;
};

const UnitsModal = ({
  open,
  handleClose,
  latitude,
  longitude,
  selectType,
}: UnitsModalProps) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const getDistance = (type: string) => {
    if (type === "land") {
      if (selectType === "is_correct") return "2000";
      return "10000";
    }

    return "1000";
  };

  const handleNext = () => {
    if (!selectedOption) {
      alert("Please choose a property type");
      return;
    }

    const distance = getDistance(selectedOption);

    localStorage.setItem("distance", distance);
    localStorage.setItem("latitude", String(latitude));
    localStorage.setItem("longitude", String(longitude));
    localStorage.setItem("propertyType", selectedOption);

    router.push(`/${selectedOption}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="text-2xl font-semibold mb-2">
          Which One Do You Preferred?
        </DialogHeader>

        {["apartment", "commercial", "villa", "land"].map((item) => (
          <div
            key={item}
            className="flex items-center space-x-2 py-2 cursor-pointer"
            onClick={() => handleOptionChange(item)}
          >
            <CheckCircle
              className={`h-5 w-5 ${
                selectedOption === item ? "text-emerald-600" : "text-gray-400"
              }`}
            />
            <label className="text-black capitalize cursor-pointer">
              {item}
            </label>
          </div>
        ))}
        <DialogFooter className="pt-4 flex">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnitsModal;
