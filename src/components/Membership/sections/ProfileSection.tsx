import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { ApplicationState, LibraryMembershipData } from "../types";

interface ProfileSectionProps {
  data: LibraryMembershipData;
  actionInProgress: boolean;
  onAction: (action: ApplicationState) => void;
  isEditing?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  data,
  actionInProgress,
  onAction,
  isEditing = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Profile Info */}
        <div className="flex items-center gap-6">
          {/* Profile Image with Status Badge */}
          <div className="relative">
            <img
              src={data.application.profile_pic || '/placeholder.png'}
              alt={data.application.full_name}
              className="w-28 h-28 rounded-xl object-cover ring-4 ring-orange-50"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <StatusBadge status={data.state} />
            </div>
          </div>

          {/* Name and ID */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {data.application.full_name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant="secondary" 
                className="bg-orange-50 text-orange-700"
              >
                {data.application.membership_type}
              </Badge>
              <span className="text-sm text-gray-500">
                ID: {data.id}
              </span>
            </div>
            {/* Additional Info */}
            <div className="mt-2 flex flex-col gap-1 text-sm text-gray-500">
              <span>{data.application.faculty}</span>
              <span>{data.application.course}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isEditing && data.state === 'pending' && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              disabled={actionInProgress}
              onClick={() => onAction('rejected')}
              className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              variant="outline"
              disabled={actionInProgress}
              onClick={() => onAction('approved')}
              className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </div>
        )}
      </div>

      {/* Application Timeline */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Applied: {new Date(data.created_at).toLocaleDateString()}</span>
          {data.status_updated_date && (
            <span>
              Last Updated: {new Date(data.status_updated_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
