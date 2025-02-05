// AcademicSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Building, School, IdCard } from "lucide-react";
import { InfoItem } from "../InfoItem";
import { EditableInfoItem } from "../EditableInfoItem";
import { LibraryMembershipData } from "../types";


interface AcademicSectionProps {
  data: LibraryMembershipData;
  isEditing: boolean;
  onEdit?: (field: string, value: string) => void;
}


export const AcademicSection: React.FC<AcademicSectionProps> = ({
  data,
  isEditing,
  onEdit
}) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <School className="w-5 h-5 text-orange-500" />
          Academic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isEditing ? (
            <>
              <EditableInfoItem
                icon={<Building size={18} />}
                label="Faculty"
                value={data.application.faculty}
                onEdit={(val) => onEdit?.("faculty", val)}
                isEditing={isEditing}
              />
              <EditableInfoItem
                icon={<School size={18} />}
                label="Course"
                value={data.application.course}
                onEdit={(val) => onEdit?.("course", val)}
                isEditing={isEditing}
              />
              <EditableInfoItem
                icon={<School size={18} />}
                label="Level"
                value={data.application.level}
                onEdit={(val) => onEdit?.("level", val)}
                isEditing={isEditing}
              />
              <EditableInfoItem
                icon={<IdCard size={18} />}
                label="Student ID"
                value={data.application.student_id}
                onEdit={(val) => onEdit?.("student_id", val)}
                isEditing={isEditing}
              />
            </>
          ) : (
            <>
              <InfoItem
                icon={<Building size={18} />}
                label="Faculty"
                value={data.application.faculty}
              />
              <InfoItem
                icon={<School size={18} />}
                label="Course"
                value={data.application.course}
              />
              <InfoItem
                icon={<School size={18} />}
                label="Level"
                value={data.application.level}
              />
              <InfoItem
                icon={<IdCard size={18} />}
                label="Student ID"
                value={data.application.student_id}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};