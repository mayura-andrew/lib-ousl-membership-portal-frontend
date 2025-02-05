import { Badge } from "@/components/ui/badge";
import { Check, X, Clock } from "lucide-react";
import { Status } from "./types";

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = {
    approved: {
      className: "bg-green-100 text-green-800 border-green-200",
      icon: <Check className="w-3 h-3 mr-1" />
    },
    rejected: {
      className: "bg-red-100 text-red-800 border-red-200", 
      icon: <X className="w-3 h-3 mr-1" />
    },
    pending: {
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <Clock className="w-3 h-3 mr-1" />
    }
  };

  const { className, icon } = config[status];
  return (
    <Badge variant="outline" className={`${className} px-3 py-1 text-xs font-semibold rounded-full flex items-center`}>
      {icon}
      {status.toUpperCase()}
    </Badge>
  );
};
