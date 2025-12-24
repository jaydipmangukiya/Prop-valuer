"use client";

import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import PricingBox from "./PricingBox";
import { getSubscription } from "@/app/api/subscription";
import { Loader } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/components/authentication/AuthProvider";
import { RazorpayOrderOptions } from "react-razorpay";
import { useRouter } from "next/navigation";

interface SubscriptionPlansProps {
  handleClose?: () => void;
}

const SubscriptionPlans = ({ handleClose }: SubscriptionPlansProps) => {
  const [plans, setPlans] = useState<any[]>([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, refetch } = useAuth();

  const fetchPlans = useCallback(async () => {
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
  }, [toast]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handlePlanClick = async (plan: any) => {
    try {
      setLoading(true);

      // 1️⃣ Create order on backend
      const res = await axiosInstance.post("/create-order", {
        amount: Number(plan.per_report_price),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      });

      const order = res.data;
      handleClose?.();

      // 2️⃣ Razorpay config
      const options: RazorpayOrderOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
        amount: order.amount,
        currency: order.currency,
        name: "Subscription Payment",
        description: plan.plan_name,
        order_id: order.id,

        handler: async (response: any) => {
          try {
            const paymentres = await axiosInstance.post("/razorpay", {
              user_id: user?._id,
              subscriptions_id: plan._id,
              razor_pay_response: response.razorpay_payment_id,
              order_id: order.id,
            });
            if (paymentres?.status === 201) {
              toast({
                title: "Payment Successful 🎉",
                description: "Your subscription has been activated.",
              });
              router.push("/");
              await refetch();
            }
          } catch (error) {
            toast({
              title: "Verification Failed ❌",
              description: "Something went wrong while verifying payment.",
              variant: "destructive",
            });
          }
        },

        prefill: {
          name: user?.name || "",
          contact: user?.phone || "",
          email: user?.email || "",
        },

        theme: { color: "#0d9488", hide_topbar: false },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      // 3️⃣ Open Razorpay Checkout
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        toast({
          title: "Razorpay not loaded",
          description: "Please refresh and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      toast({
        title: "Payment Error ❌",
        description: "Unable to start payment process.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(plans.length, "plans.length");

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div
        className={`flex flex-wrap justify-center gap-8 ${
          plans.length === 2 ? "md:justify-center" : "md:justify-between"
        }`}
      >
        {plans?.map((plan: any, index: number) => (
          <div key={index} className="w-full md:w-[420px]">
            <PricingBox
              key={index}
              packageName={plan.plan_name}
              price={plan.final_price}
              duration="Month"
              title="Get Started"
              onClick={() => handlePlanClick(plan)}
              noOfReport={plan.no_of_report}
              discount={plan.discount}
              isActive={plan.plan_name}
            ></PricingBox>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SubscriptionPlans;
