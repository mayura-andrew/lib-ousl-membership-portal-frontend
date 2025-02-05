import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { InfoItem } from "../InfoItem";
import { EditableInfoItem } from "../EditableInfoItem";
import { LibraryMembershipData } from "../types";

interface ContactSectionProps {
  data: LibraryMembershipData;
  isEditing: boolean;
  onEdit?: (field: string, value: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  isEditing,
  onEdit
}) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-orange-500" />
          Contact Information
        </h2>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <EditableInfoItem
                icon={<Mail size={18} />}
                label="University Email"
                value={data.application.university_email}
                onEdit={(value) => onEdit?.('university_email', value)} isEditing={false}              />
              <EditableInfoItem
                icon={<Mail size={18} />}
                label="Personal Email"
                value={data.application.personal_email}
                onEdit={(value) => onEdit?.('personal_email', value)} isEditing={false}              />
              <EditableInfoItem
                icon={<Phone size={18} />}
                label="Phone Number"
                value={data.application.contact_no}
                onEdit={(value) => onEdit?.('contact_no', value)} isEditing={false}              />
              <EditableInfoItem
                icon={<MapPin size={18} />}
                label="Street"
                value={data.application.permanent_address.street}
                onEdit={(value) => onEdit?.('permanent_address.street', value)} isEditing={false}              />
              <EditableInfoItem
                icon={<MapPin size={18} />}
                label="City"
                value={data.application.permanent_address.city}
                onEdit={(value) => onEdit?.('permanent_address.city', value)} isEditing={false}              />
              <EditableInfoItem
                icon={<MapPin size={18} />}
                label="State"
                value={data.application.permanent_address.state}
                onEdit={(value) => onEdit?.('permanent_address.state', value)} isEditing={false}              />
              <EditableInfoItem
                icon={<MapPin size={18} />}
                label="ZIP Code"
                value={data.application.permanent_address.zip}
                onEdit={(value) => onEdit?.('permanent_address.zip', value)} isEditing={false}              />
            </>
          ) : (
            <>
              <InfoItem
                icon={<Mail size={18} />}
                label="Email Addresses"
                value={
                  <div className="space-y-1">
                    <p className="font-medium">{data.application.university_email}</p>
                    <p className="text-gray-500">{data.application.personal_email}</p>
                  </div>
                }
              />
              <InfoItem
                icon={<Phone size={18} />}
                label="Phone Number"
                value={data.application.contact_no}
              />
              <InfoItem
                icon={<MapPin size={18} />}
                label="Permanent Address"
                value={
                  <address className="not-italic">
                    {data.application.permanent_address.street}<br />
                    {data.application.permanent_address.city}<br />
                    {data.application.permanent_address.state} {data.application.permanent_address.zip}
                  </address>
                }
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};