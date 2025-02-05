// src/components/ui/tooltip-button.tsx
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipButtonProps {
  tooltip: string;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: "outline" | "default";
  className?: string;
  disabled?: boolean;
}

export const TooltipButton: React.FC<TooltipButtonProps> = ({
  tooltip,
  onClick,
  icon,
  label,
  variant = "outline",
  className,
  disabled
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant={variant}
        onClick={onClick}
        className={className}
        disabled={disabled}
      >
        {icon}
        {label}
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);
