import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle, Pencil, Save, RotateCcw } from "lucide-react";
import ProcessTimeline from '../ProcessTimeline';
import { Alert, AlertDescription } from '../ui/alert';
import LoadingSkeleton from '../LoadingSkeleton';
import {TooltipProvider } from '../ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from "../../../hooks/use-toast";
import ProfileSection from '../Membership/sections/ProfileSection';
import { ContactSection } from '../Membership/sections/ContactSection';
import { AcademicSection } from '../Membership/sections/AcademicSection';
import { TooltipButton } from '../ui/tooltip-button';

type ApplicationState = 'pending' | 'approved' | 'rejected';

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

const MembershipApplicationDetail: React.FC = () => {
  const { membershipId } = useParams();
  const [data, setData] = useState<LibraryMembershipData | null>(null);
  const [editedData, setEditedData] = useState<LibraryMembershipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<ApplicationState | null>(null);

  const handleEdit = () => {
    setEditedData(data);
    setIsEditing(true);
  }

  const handleSave = async () => {
    setActionInProgress(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(editedData);
      setIsEditing(false);
      toast({
        title: "Changes saved successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to save changes",
        description: "Please try again",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setActionInProgress(false);
    }
  };

  const handleCancel = () => {
    setEditedData(data)
    setIsEditing(false)
  }

  const handleAction = async (action: ApplicationState) => {
    setPendingAction(action);
    setShowConfirmDialog(true);
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

  const confirmAction = async () => {
    if (!pendingAction) return;
    
    setActionInProgress(true);
    setShowConfirmDialog(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(prev => prev ? {
        ...prev,
        state: pendingAction,
        status_updated_date: new Date().toISOString()
      } : null);
      
      toast({
        title: `Application ${pendingAction} successfully`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Action failed",
        description: "Please try again",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setActionInProgress(false);
      setPendingAction(null);
    }
  };

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
    <TooltipProvider>
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Card */}
      <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Membership Application</h1>
      <div className="flex gap-3">
        {!isEditing ? (
          <>
<TooltipButton
  tooltip="Edit application details"
  onClick={handleEdit}
  icon={<Pencil className="w-4 h-4" />}
  label="Edit Details"
  className="bg-orange-50 hover:bg-orange-100 text-orange-600"
/>

<TooltipButton
  tooltip="Reject application" 
  onClick={() => handleAction('rejected')}
  icon={<X className="w-4 h-4" />}
  label="Reject"
  className="bg-red-50 hover:bg-red-100 text-red-600"
  disabled={actionInProgress}
/> <TooltipButton
  tooltip="Approve application"
  onClick={() => handleAction('approved')}
  icon={<Check className="w-4 h-4" />}
  label="Approve"
  className="bg-green-50 hover:bg-green-100 text-green-600"
  disabled={actionInProgress}
/>
          </>
          ) : (
            <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-200"
                  disabled={actionInProgress}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  disabled={actionInProgress}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
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

<ProfileSection 
          data={data}
          actionInProgress={actionInProgress}
          onAction={handleAction}
          isEditing={isEditing}
        />

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContactSection 
            data={data}
            isEditing={isEditing}
            onEdit={handleEdit}
          />

          <AcademicSection 
            data={data}
            isEditing={isEditing}
            onEdit={handleEdit}
      />


      </div>
    </div>

    {/* Confirmation Dialog */}
    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Confirm {pendingAction === 'approved' ? 'Approval' : 'Rejection'}
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to {pendingAction} this application? 
          This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
      <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant={pendingAction === 'approved' ? 'default' : 'destructive'}
              onClick={confirmAction}
            >
              {pendingAction === 'approved' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
);
}

export default MembershipApplicationDetail;