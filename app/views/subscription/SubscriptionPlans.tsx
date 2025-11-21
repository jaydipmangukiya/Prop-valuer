"use client";

import { useEffect, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import PricingBox from "./PricingBox";
import { getSubscription } from "@/app/api/subscription";
import { Loader } from "lucide-react";

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await getSubscription();
      const sorted = res?.allSubscriptionPlan?.sort(
        (a: any, b: any) => a.plan_no - b.plan_no
      );
      setPlans(sorted);
    } catch (err: any) {
      toast({
        title: "Failed to load Staff ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handlePlanClick = (plan: any) => {
    // Later add Razorpay logic HERE
    console.log("Selected Plan", plan);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans?.map((plan: any, index: number) => (
          <PricingBox
            key={index}
            packageName={plan.plan_name}
            price={plan.final_price}
            duration="Month"
            title="Get Started"
            onClick={() => handlePlanClick(plan)}
            noOfReport={plan.no_of_report}
            discount={plan.discount}
          ></PricingBox>
        ))}
      </div>
    </div>
  );
}
