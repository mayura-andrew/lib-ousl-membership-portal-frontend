interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    className?: string;
  }
  
export const InfoItem = ({ icon, label, value, className = "" }: InfoItemProps) => (
    <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
      <div className="flex items-center space-x-2 mb-2">
        <div className="text-orange-500">{icon}</div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <div className="ml-6 text-gray-900">{value}</div>
    </div>
);
