"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { verifyOtp } from "../api/authService";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const email = globalThis?.window?.localStorage?.getItem("registeredEmail");

  const handleVerify = async () => {
    if (!otp) return;
    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp: Number(otp) });
      toast({
        title: "OTP Verified ✅",
        description: "Welcome to Asstory!",
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "Invalid OTP ❌",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          OTP Verification
        </h2>

        <p className="text-slate-600 text-center mb-4">
          OTP is sent to <strong>{email}</strong>
        </p>

        <Input
          type="number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="h-12 text-center text-lg"
        />

        <Button
          onClick={handleVerify}
          className="w-full h-12 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
}
