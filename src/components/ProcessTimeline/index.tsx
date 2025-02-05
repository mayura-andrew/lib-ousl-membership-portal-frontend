import { Check, X, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ApplicationState = 'pending' | 'approved' | 'rejected';
type PaymentStatus = 'pending' | 'processing' | 'confirmed' | 'failed';
type MembershipStatus = 'not_started' | 'processing' | 'active' | 'expired';

interface ProcessTimelineProps {
  applicationState: ApplicationState;
  paymentStatus: PaymentStatus;
  membershipStatus: MembershipStatus;
}
const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  applicationState,
  paymentStatus,
  membershipStatus
}) => {
  const steps = [
    {
      label: 'Application Review',
      description: applicationState === 'pending' ? 'Under review' : 
                  applicationState === 'approved' ? 'Application approved' : 'Application rejected',
      status: applicationState === 'approved' ? 'complete' :
              applicationState === 'rejected' ? 'failed' : 'current',
      date: '2024-02-05'
    },
    {
      label: 'Payment Processing',
      description: paymentStatus === 'pending' ? 'Awaiting payment' :
                  paymentStatus === 'processing' ? 'Processing payment' :
                  paymentStatus === 'confirmed' ? 'Payment confirmed' : 'Payment failed',
      status: applicationState !== 'approved' ? 'pending' :
              paymentStatus === 'confirmed' ? 'complete' :
              paymentStatus === 'failed' ? 'failed' : 'current',
      date: '2024-02-05'
    },
    {
      label: 'Membership Activation',
      description: membershipStatus === 'not_started' ? 'Not started' :
                  membershipStatus === 'processing' ? 'Processing' :
                  membershipStatus === 'active' ? 'Active' : 'Expired',
      status: paymentStatus !== 'confirmed' ? 'pending' :
              membershipStatus === 'active' ? 'complete' :
              membershipStatus === 'processing' ? 'current' : 'pending',
      date: '2024-02-05'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <Check className="w-5 h-5" />;
      case 'failed':
        return <X className="w-5 h-5" />;
      case 'current':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-[2.25rem] w-full h-1 bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-500 ease-in-out"
            style={{
              width: applicationState === 'approved' ?
                    paymentStatus === 'confirmed' ?
                    membershipStatus === 'active' ? '100%' : '66%'
                    : '33%'
                    : applicationState === 'rejected' ? '0%' : '33%'
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div key={step.label} className="flex flex-col items-center w-1/3">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300",
                  step.status === 'complete' ? "bg-orange-500 text-white" :
                  step.status === 'current' ? "bg-white border-2 border-orange-500 text-orange-500" :
                  step.status === 'failed' ? "bg-red-500 text-white" :
                  "bg-white border-2 border-gray-200 text-gray-400"
                )}
              >
                {getStatusIcon(step.status)}
              </div>
              
              <div className="mt-4 text-center">
                <h3 className={cn(
                  "font-medium",
                  step.status === 'complete' ? "text-orange-600" :
                  step.status === 'current' ? "text-orange-600" :
                  step.status === 'failed' ? "text-red-600" :
                  "text-gray-400"
                )}>
                  {step.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {step.description}
                </p>
                <time className="text-xs text-gray-400 mt-1 block">
                  {new Date(step.date).toLocaleDateString()}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
