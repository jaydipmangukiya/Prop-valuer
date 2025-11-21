"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

export const StatusBadge = ({
  isActive,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
}: StatusBadgeProps) => {
  return (
    <Badge
      variant={isActive ? "default" : "secondary"}
      className={
        isActive
          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
          : "bg-slate-100 text-slate-800 hover:bg-slate-200"
      }
    >
      {isActive ? activeLabel : inactiveLabel}
    </Badge>
  );
};
export default StatusBadge;
