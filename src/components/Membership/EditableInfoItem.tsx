import { useState, useEffect, ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface EditableInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  onEdit: (value: string) => void;
  type?: "text" | "select" | "email" | "tel" | "number";
  options?: Array<{ value: string; label: string }>;
  className?: string;
  isEditing: boolean;
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => string | undefined;
}

export const EditableInfoItem: React.FC<EditableInfoItemProps> = ({
  icon,
  label,
  value: initialValue,
  onEdit,
  type = "text",
  options = [],
  className = "",
  isEditing,
  placeholder = `Enter ${label.toLowerCase()}`,
  required = false,
  validate
}) => {
  // Local state to handle input value
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | undefined>();

  // Update local state when prop value changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Handle input change
  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    // Validate if validation function is provided
    if (validate) {
      const validationError = validate(newValue);
      setError(validationError);
      
      // Only call onEdit if there's no validation error
      if (!validationError) {
        onEdit(newValue);
      }
    } else {
      onEdit(newValue);
    }
  };

  // Render the appropriate input based on type
  const renderInput = () => {
    if (type === "select") {
      return (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger className="w-full border-gray-200 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <SelectValue placeholder={placeholder}>{value}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="cursor-pointer hover:bg-orange-50"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full border-gray-200 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
          error ? 'border-red-500' : ''
        }`}
        placeholder={placeholder}
        required={required}
      />
    );
  };

  return (
    <div className={`p-4 rounded-lg transition-colors ${isEditing ? 'bg-gray-50' : 'bg-transparent'} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-orange-500">{icon}</div>
          <p className="text-sm font-medium text-gray-600">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </p>
        </div>
      </div>
      <div className="ml-6">
        {isEditing ? (
          <div className="space-y-1">
            {renderInput()}
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>
        ) : (
          <div className="text-gray-900 py-2">{value || <span className="text-gray-400">Not specified</span>}</div>
        )}
      </div>
    </div>
  );
};
