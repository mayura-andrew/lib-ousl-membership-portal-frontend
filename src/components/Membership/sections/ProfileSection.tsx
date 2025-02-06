import { useState, useEffect } from 'react';
import { StatusBadge } from "../StatusBadge";
import { EditableInfoItem } from "../EditableInfoItem";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Pencil, Camera, Mail, Phone, MapPin, 
  Building, School, IdCard, Save, User, X 
} from "lucide-react";

interface ProfileData {
  id: string;
  application: {
    profile_pic?: string;
    title: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    initials: string;
    full_name: string;
    membership_type: string;
    faculty: string;
    course: string;
    level: string;
    student_id: string;
    university_email: string;
    personal_email: string;
    contact_no: string;
    permanent_address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  state: 'pending' | 'approved' | 'rejected';
  created_at: string;
  status_updated_date?: string;
}

interface ProfileSectionProps {
  data: ProfileData;
  actionInProgress: boolean;
  onAction: (action: 'approved' | 'rejected') => void;
  onSave: (updatedData: Partial<ProfileData['application']>) => Promise<void>;
  isEditing: boolean;
}

interface AddressFields {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  data,
  actionInProgress,
  onAction,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<ProfileData['application']>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(data.application.profile_pic);

  useEffect(() => {
    setProfileImage(data.application.profile_pic);
  }, [data.application.profile_pic]);


  const handleEdit = (
    field: keyof ProfileData['application'] | `permanent_address.${keyof AddressFields}`,
    value: string
  ) => {
    setEditedData((prev) => {
      // Initialize permanent_address if it doesn't exist
      const currentAddress = prev.permanent_address || {
        street: data.application.permanent_address.street,
        city: data.application.permanent_address.city,
        state: data.application.permanent_address.state,
        zip: data.application.permanent_address.zip
      };
  
      if (field.includes('.')) {
        const [child] = field.split('.') as ['permanent_address', keyof AddressFields];
        return {
          ...prev,
          permanent_address: {
            ...currentAddress,
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [field as keyof ProfileData['application']]: value
      };
    });
  };
  

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      handleEdit('profile_pic', imageUrl);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(editedData);
      setIsEditing(false);
      setEditedData({});
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({});
    setProfileImage(data.application.profile_pic);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Header with Profile */}
        <div className="flex items-start gap-8">
          {/* Left: Profile Image & Status */}
          <div className="relative group">
            <div className="relative w-32 h-32">
              <img
                src={profileImage || '/placeholder.png'}
                alt={data.application.full_name}
                className="w-full h-full rounded-xl object-cover ring-4 ring-orange-50 shadow-md transition-all duration-300"
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="text-white flex flex-col items-center">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">Change Photo</span>
                  </div>
                </label>
              )}
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <StatusBadge status={data.state} />
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="flex-grow">
            <div className="flex justify-between">
              {/* Basic Info */}
              <div className="space-y-4 flex-grow">
                {isEditing ? (
                  <>
                    <EditableInfoItem
                      icon={<User size={16} />}
                      label="Title"
                      value={editedData.title || data.application.title}
                      onEdit={(value) => handleEdit('title', value)}
                      isEditing={true}
                      type="select"
                      options={[
                        { value: 'Mr', label: 'Mr' },
                        { value: 'Mrs', label: 'Mrs' },
                        { value: 'Ms', label: 'Ms' },
                        { value: 'Dr', label: 'Dr' },
                        { value: 'Prof', label: 'Prof' },
                      ]}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <EditableInfoItem
                        icon={<User size={16} />}
                        label="First Name"
                        value={editedData.first_name || data.application.first_name}
                        onEdit={(value) => handleEdit('first_name', value)}
                        isEditing={true}
                        required
                      />
                      <EditableInfoItem
                        icon={<User size={16} />}
                        label="Middle Name"
                        value={editedData.middle_name || data.application.middle_name || ''}
                        onEdit={(value) => handleEdit('middle_name', value)}
                        isEditing={true}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <EditableInfoItem
                        icon={<User size={16} />}
                        label="Last Name"
                        value={editedData.last_name || data.application.last_name}
                        onEdit={(value) => handleEdit('last_name', value)}
                        isEditing={true}
                        required
                      />
                      <EditableInfoItem
                        icon={<User size={16} />}
                        label="Initials"
                        value={editedData.initials || data.application.initials}
                        onEdit={(value) => handleEdit('initials', value)}
                        isEditing={true}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {data.application.title}. {data.application.full_name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                        {data.application.initials}
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        {data.application.membership_type}
                      </Badge>
                      <span className="text-sm text-gray-500">ID: {data.id}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-start gap-2">
                {!isEditing ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-orange-600"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="w-4 h-4" />
                    <span className="ml-2">Edit</span>
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="border-gray-200"
                      disabled={isSaving}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2">⌛</span>
                          Saving...
                        </span>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Info Sections */}
            <div className="mt-6 space-y-6">
              {/* Academic Details */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {isEditing ? (
                  <>
                    <EditableInfoItem
                      icon={<Building size={16} />}
                      label="Faculty"
                      value={editedData.faculty || data.application.faculty}
                      onEdit={(value) => handleEdit('faculty', value)}
                      isEditing={true}
                      required
                    />
                    <EditableInfoItem
                      icon={<School size={16} />}
                      label="Course"
                      value={editedData.course || data.application.course}
                      onEdit={(value) => handleEdit('course', value)}
                      isEditing={true}
                      required
                    />
                    {/* <EditableInfoItem
                      icon={<School size={16} />}
                      label="Level"
                      value={editedData.level || data.application.level}
                      onEdit={(value) => handleEdit('level', value)}
                      isEditing={true}
                      required
                    /> */}
                    <EditableInfoItem
                      icon={<User size={16} />}
                      label="Level"
                      value={editedData.level || data.application.level}
                      onEdit={(value) => handleEdit('level', value)}
                      isEditing={true}
                      type="select"
                      options={[
                        { value: '3', label: 'Level 3' },
                        { value: '4', label: 'Level 4' },
                        { value: '5', label: 'Level 5' },
                        { value: '6', label: 'Level 6' },
                        { value: '7', label: 'Level 7' },
                      ]}
                      required
                    />
                    <EditableInfoItem
                      icon={<IdCard size={16} />}
                      label="Student ID"
                      value={editedData.student_id || data.application.student_id}
                      onEdit={(value) => handleEdit('student_id', value)}
                      isEditing={true}
                      required
                    />
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-sm text-gray-500">Faculty</span>
                      <p className="font-medium">{data.application.faculty}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Course</span>
                      <p className="font-medium">{data.application.course}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Level</span>
                      <p className="font-medium">{data.application.level}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Student ID</span>
                      <p className="font-medium">{data.application.student_id}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-gray-100">
                {isEditing ? (
                  <>
                    <EditableInfoItem
                      icon={<Mail size={16} />}
                      label="University Email"
                      value={editedData.university_email || data.application.university_email}
                      onEdit={(value) => handleEdit('university_email', value)}
                      isEditing={true}
                      type="email"
                      required
                    />
                    <EditableInfoItem
                      icon={<Mail size={16} />}
                      label="Personal Email"
                      value={editedData.personal_email || data.application.personal_email}
                      onEdit={(value) => handleEdit('personal_email', value)}
                      isEditing={true}
                      type="email"
                      required
                    />
                    <EditableInfoItem
                      icon={<Phone size={16} />}
                      label="Contact Number"
                      value={editedData.contact_no || data.application.contact_no}
                      onEdit={(value) => handleEdit('contact_no', value)}
                      isEditing={true}
                      type="tel"
                      required
                    />
                    <EditableInfoItem
                      icon={<MapPin size={16} />}
                      label="Street"
                      value={editedData.permanent_address?.street || data.application.permanent_address.street}
                      onEdit={(value) => handleEdit('permanent_address.street', value)}
                      isEditing={true}
                      required
                    />
                    <EditableInfoItem
                      icon={<MapPin size={16} />}
                      label="City"
                      value={editedData.permanent_address?.city || data.application.permanent_address.city}
                      onEdit={(value) => handleEdit('permanent_address.city', value)}
                      isEditing={true}
                      required
                    />
                    <EditableInfoItem
                      icon={<MapPin size={16} />}
                      label="State"
                      value={editedData.permanent_address?.state || data.application.permanent_address.state}
                      onEdit={(value) => handleEdit('permanent_address.state', value)}
                      isEditing={true}
                      required
                    />
                    <EditableInfoItem
                      icon={<MapPin size={16} />}
                      label="ZIP Code"
                      value={editedData.permanent_address?.zip || data.application.permanent_address.zip}
                      onEdit={(value) => handleEdit('permanent_address.zip', value)}
                      isEditing={true}
                      type="text"
                      required
                    />
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-sm text-gray-500">University Email</span>
                      <p className="font-medium">{data.application.university_email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Personal Email</span>
                      <p className="font-medium">{data.application.personal_email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Contact Number</span>
                      <p className="font-medium">{data.application.contact_no}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Address</span>
                      <p className="font-medium">
                        {data.application.permanent_address.street},
                        <br />
                        {data.application.permanent_address.city},
                        <br />
                        {data.application.permanent_address.state} {data.application.permanent_address.zip}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Footer */}
        <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Applied:</span>
            <span className="font-medium">
              {new Date(data.created_at).toLocaleDateString()}
            </span>
          </div>
          {data.status_updated_date && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Last Updated:</span>
              <span className="font-medium">
                {new Date(data.status_updated_date).toLocaleDateString()}
              </span>
            </div>
          )}
          {data.state === 'pending' && !isEditing && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAction('rejected')}
                disabled={actionInProgress}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Reject
              </Button>
              <Button
                size="sm"
                onClick={() => onAction('approved')}
                disabled={actionInProgress}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Approve
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};