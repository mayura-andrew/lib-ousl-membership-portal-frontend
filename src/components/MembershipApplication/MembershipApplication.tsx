import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle, Pencil, Save, RotateCcw } from "lucide-react";
import ProcessTimeline from '../ProcessTimeline';
import { Alert, AlertDescription } from '../ui/alert';
import LoadingSkeleton from '../LoadingSkeleton';
import {TooltipProvider } from '../ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from "../../hooks/use-toast";
import { TooltipButton } from '../ui/tooltip-button';
import { ProfileSection } from '../Membership/sections/ProfileSection';
import { useNotifications } from '@/contexts/NotificationContext';

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
    initials: string;
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
      initials: "M",
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
  const { addNotification } = useNotifications();
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

      addNotification({
        type: 'success',
        title: 'Changes Saved',
        message: 'Application details have been updated successfully',
        link: `/admin/dashboard/memberships/${data?.id}`
      });
      toast({
        title: "Changes saved successfully",
        variant: "default",
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Save Failed',
        message: 'Failed to save changes. Please try again.',
      });
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

      addNotification({
        type: 'success',
        title: `Application ${pendingAction}`,
        message: `Membership application has been ${pendingAction} successfully`,
        link: `/admin/dashboard/memberships/${data?.id}`
      });
      
      toast({
        title: `Application ${pendingAction} successfully`,
        variant: "default",
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Action Failed',
        message: `Failed to ${pendingAction} application. Please try again.`
      });
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
      <div className="flex flex-col h-screen">
        <div className="bg-white border-b top-0 z-10">
    <div className="max-w-6xl mx-auto p-6">
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
      </div>
      </div>
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6">
          <ProcessTimeline 
            applicationState={data.state}
            paymentStatus={data.payment_status}
            membershipStatus={data.membership_status}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-8">

      {/* Status Alert */}
      {data.state === 'pending' && (
        <Alert variant="default" className="bg-amber-50 border-amber-200">          <AlertCircle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            This application requires your review. Please check all details carefully before making a decision.
          </AlertDescription>
        </Alert>
      )}

        <ProfileSection 
          data={data}
          actionInProgress={actionInProgress}
          onAction={handleAction}
          isEditing={isEditing}
          onSave={handleSave}
        />
    </div>
  </div>
  </div>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <DialogContent className="bg-white p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 space-y-3 border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {pendingAction === 'approved' ? (
              <>
                <Check className="w-5 h-5 text-orange-500" />
                Confirm Approval
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-orange-500" />
                Confirm Rejection
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-orange-50/50 rounded-lg">
                <img
                  src={data.application.profile_pic || '/placeholder.png'}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-100"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {data.application.full_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID: {data.application.student_id}
                  </p>
                </div>
              </div>
              
              <p className="text-sm">
                Are you sure you want to {pendingAction} this membership application? 
                This action cannot be undone.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
    
        <DialogFooter className="p-6 pt-4 bg-gray-50/50 border-t border-gray-100">
          <div className="flex justify-end gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              className={
                pendingAction === 'approved' 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }
            >
              {pendingAction === 'approved' ? 'Approve Application' : 'Reject Application'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </TooltipProvider>
);
}

export default MembershipApplicationDetail;