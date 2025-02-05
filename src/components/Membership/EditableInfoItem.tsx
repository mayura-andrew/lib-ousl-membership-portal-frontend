// EditableInfoItem.tsx
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Pencil } from "lucide-react";
import { ReactNode } from 'react';

interface EditableInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  onEdit: (value: string) => void;
  type?: "text" | "select";
  options?: Array<{value: string, label: string}>;
  className?: string;
  isEditing: boolean;
}

export const EditableInfoItem: React.FC<EditableInfoItemProps> = ({
  icon,
  label,
  value,
  onEdit,
  type = "text",
  options = [],
  className = "",
  isEditing
}) => {
  return (
    <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-orange-500">{icon}</div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
        </div>
        {isEditing && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-400 hover:text-gray-600">
                  <Pencil size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="ml-6">
        {isEditing ? (
          type === "select" ? (
<Select value={value} onValueChange={onEdit}>
    <SelectTrigger className="border-gray-200 focus:border-orange-500">
      <SelectValue placeholder="Select option" />
    </SelectTrigger>
    <SelectContent>
      {options.map(option => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
) : (
            <Input
              type="text"
              value={value}
              onChange={(e) => onEdit(e.target.value)}
              className="border-gray-200 focus:border-orange-500"
            />
          )
        ) : (
          <div className="text-gray-900">{value}</div>
        )}
      </div>
    </div>
  );
};
