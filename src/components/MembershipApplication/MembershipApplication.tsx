import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, User, Mail, Phone, MapPin, School, Calendar, IdCard, Building, Clock, AlertCircle } from "lucide-react";
import { Skeleton } from '../ui/skeleton';
import ProcessTimeline from '../ProcessTimeline';
import { Alert, AlertDescription } from '../ui/alert';

type Status = 'approved' | 'rejected' | 'pending';
type ApplicationState = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: Status;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode; // Changed from string | number
  className?: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface LibraryMembershipData {
  id: string;
  application: {
    title: string;
    first_name: string;
    last_name: string;
    full_name: string;
    reg_no: number;
    membership_type: 'UNDERGRADUATE' | 'POSTGRADUATE' | 'STAFF' | 'EXTERNAL';
    student_id: string;
    faculty: string;
    course: string;
    level: string;
    personal_email: string;
    university_email: string;
    contact_no: string;
    permanent_address: Address;
    nic_no: string;
    date_of_birth: string;
    profile_pic?: string;
  };
  state: 'pending' | 'approved' | 'rejected';
  payment_status: 'pending' | 'processing' | 'confirmed' | 'failed';
  membership_status: 'not_started' | 'processing' | 'active' | 'expired';
  created_at: string;
  updated_at: string;
  status_updated_by?: string;
  status_updated_date?: string;
}
const mockData: LibraryMembershipData = {
    id: "LIB-2024-001",
    application: {
      title: "Mr",
      first_name: "John",
      last_name: "Smith",
      full_name: "John Michael Smith",
      reg_no: 20240001,
      membership_type: "UNDERGRADUATE",
      student_id: "OU2024CS001",
      faculty: "Faculty of Natural Sciences",
      course: "BSc in Computer Science",
      level: "Level 3",
      personal_email: "john.smith@gmail.com",
      university_email: "john.s@ousl.lk",
      contact_no: "+94 71 234 5678",
      permanent_address: {
        street: "123 Main Street",
        city: "Colombo",
        state: "Western Province",
        zip: "10100"
      },
      nic_no: "200012345678",
      date_of_birth: "2000-05-15",
      profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    state: "pending",
    payment_status: "pending",
    membership_status: "not_started",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, className = "" }) => (
  <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
    <div className="flex items-center space-x-2 mb-2">
      <div className="text-orange-500">{icon}</div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
    </div>
    <div className="ml-6 text-gray-900">{value}</div>
  </div>
);


const MembershipApplicationDetail: React.FC = () => {
  const { membershipId } = useParams();
  const [data, setData] = useState<LibraryMembershipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(false);

  const handleAction = async (action: ApplicationState) => {
    setActionInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setData(prev => prev ? {
      ...prev,
      state: action,
      status_updated_date: new Date().toISOString()
    } : null);
    setActionInProgress(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(prev => prev ? {
        ...prev,
        state: action,
        status_updated_date: new Date().toISOString()
      } : null);
    } finally {
      setActionInProgress(false);
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [membershipId]);

  if (isLoading || !data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Card */}

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <ProcessTimeline 
          applicationState={data.state}
          paymentStatus={data.payment_status}
          membershipStatus={data.membership_status}
        />
      </div>
      
      {/* Status Alert */}
      {data.state === 'pending' && (
        <Alert variant="default" className="bg-amber-50 border-amber-200">          <AlertCircle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            This application requires your review. Please check all details carefully before making a decision.
          </AlertDescription>
        </Alert>
      )}
{/* Profile Section */}
<div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={data.application.profile_pic || '/placeholder.png'}
                alt="Profile"
                className="w-28 h-28 rounded-xl object-cover ring-4 ring-orange-50"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <StatusBadge status={data.state} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {data.application.full_name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                  {data.application.membership_type}
                </Badge>
                <span className="text-sm text-gray-500">ID: {data.id}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              disabled={actionInProgress || data.state === 'rejected'}
              onClick={() => handleAction('rejected')}
              className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              variant="outline"
              disabled={actionInProgress || data.state === 'approved'}
              onClick={() => handleAction('approved')}
              className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <InfoItem
                icon={<User size={18} />}
                label="Full Name"
                value={`${data.application.title}. ${data.application.full_name}`}
              />
              <InfoItem
                icon={<IdCard size={18} />}
                label="NIC Number"
                value={data.application.nic_no}
              />
              <InfoItem
                icon={<Calendar size={18} />}
                label="Date of Birth"
                value={new Date(data.application.date_of_birth).toLocaleDateString()}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-500" />
              Contact Information
            </h2>
            <div className="space-y-4">
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
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <School className="w-5 h-5 text-orange-500" />
              Academic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


const LoadingSkeleton: React.FC = () => (
  <div className="max-w-5xl mx-auto p-6 space-y-6">
    <Card className="border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default MembershipApplicationDetail;
