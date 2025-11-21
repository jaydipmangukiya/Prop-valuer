"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SubscriptionPlans from "./SubscriptionPlans";

export default function SubscriptionModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Choose Your Subscription Plan
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <SubscriptionPlans />
        </div>
      </DialogContent>
    </Dialog>
  );
}
