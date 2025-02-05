import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  CreditCard, Receipt, CalendarDays, 
  CheckCircle2, XCircle
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type PaymentStatus = 'pending' | 'verified' | 'rejected' | 'awaiting_payment';

interface PaymentStatusBadgeProps {
    status: PaymentStatus;
}

interface PaymentVerificationData {
  id: string;
  application: {
    full_name: string;
    reg_no: number;
    faculty: string;
    student_id: string;
    membership_type: string;
    profile_pic?: string;
  };
  payment: {
    status: 'pending' | 'verified' | 'rejected' | 'awaiting_payment';
    amount: number;
    due_date?: string;
    payment_method?: 'CASH' | 'BANK_TRANSFER' | 'ONLINE';
    reference_number?: string;
    paid_date?: string;
    verified_by?: string;
    verified_date?: string;
    rejection_reason?: string;
  };
  created_at: string;
}

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  const variants: Record<PaymentStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    verified: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    awaiting_payment: "bg-blue-100 text-blue-800 border-blue-200"
  };

  return (
    <Badge variant="outline" className={`${variants[status]} px-3 py-1 text-xs font-semibold rounded-full`}>
      {status.toUpperCase().replace('_', ' ')}
    </Badge>
  );
};

const FinancePaymentVerification: React.FC = () => {
  const { applicationId } = useParams();
  const [data, setData] = useState<PaymentVerificationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [verificationDetails, setVerificationDetails] = useState({
    paymentMethod: 'CASH',
    referenceNumber: '',
    paidDate: '',
    rejectionReason: ''
  });

  const handleVerifyPayment = () => {
    setData(prev => prev ? {
      ...prev,
      payment: {
        ...prev.payment,
        status: 'verified',
        payment_method: verificationDetails.paymentMethod as 'CASH' | 'BANK_TRANSFER' | 'ONLINE',
        reference_number: verificationDetails.referenceNumber,
        paid_date: verificationDetails.paidDate,
        verified_by: 'Finance Officer',
        verified_date: new Date().toISOString()
      }
    } : null);
    setIsVerifyDialogOpen(false);
  };

  const handleRejectPayment = () => {
    setData(prev => prev ? {
      ...prev,
      payment: {
        ...prev.payment,
        status: 'rejected',
        rejection_reason: verificationDetails.rejectionReason,
        verified_by: 'Finance Officer',
        verified_date: new Date().toISOString()
      }
    } : null);
    setIsRejectDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData({
        id: 'PAY-001',
        application: {
          full_name: 'John Smith',
          reg_no: 20240001,
          faculty: 'Faculty of Science',
          student_id: 'STD001',
          membership_type: 'UNDERGRADUATE',
          profile_pic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' // Add mock profile pic

        },
        payment: {
          status: 'pending',
          amount: 1000.00,
          due_date: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      });
      setIsLoading(false);
    };
    fetchData();
  }, [applicationId]);

  if (isLoading || !data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Card */}
      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          {/* Header with Status */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">Payment Verification</h1>
              <p className="text-sm text-gray-500">Reference: #{data.id}</p>
            </div>
            <PaymentStatusBadge status={data.payment.status} />
          </div>

          {/* Profile Section */}
          <div className="flex items-start gap-6 mb-8">
            <div className="relative flex-shrink-0">
              <img
                src={data.application.profile_pic || '/placeholder.png'}
                alt={data.application.full_name}
                className="w-24 h-24 rounded-xl object-cover ring-4 ring-orange-50"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-900">
                {data.application.full_name}
              </h2>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Student ID</span>
                  <p className="font-medium">{data.application.student_id}</p>
                </div>
                <div>
                  <span className="text-gray-500">Faculty</span>
                  <p className="font-medium">{data.application.faculty}</p>
                </div>
                <div>
                  <span className="text-gray-500">Membership</span>
                  <p className="font-medium">{data.application.membership_type}</p>
                </div>
                <div>
                  <span className="text-gray-500">Registration</span>
                  <p className="font-medium">{data.application.reg_no}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Amount Card */}
          <div className="bg-orange-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium text-orange-600">Payment Amount</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  LKR {data.payment.amount.toFixed(2)}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Payment Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data.payment.due_date && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <CalendarDays className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Due Date</span>
                </div>
                <p className="text-gray-900">
                  {new Date(data.payment.due_date).toLocaleDateString()}
                </p>
              </div>
            )}

            {data.payment.payment_method && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Method</span>
                </div>
                <p className="text-gray-900">
                  {data.payment.payment_method.replace('_', ' ')}
                </p>
              </div>
            )}

            {data.payment.reference_number && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Reference</span>
                </div>
                <p className="text-gray-900">{data.payment.reference_number}</p>
              </div>
            )}
          </div>
        </CardContent>

        {/* Action Buttons */}
        {data.payment.status === 'pending' && (
          <CardFooter className="p-6 bg-gray-50 border-t">
            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                className="flex-1 border-green-200 bg-green-50 hover:bg-green-100 text-green-700"
                onClick={() => setIsVerifyDialogOpen(true)}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Verify Payment
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-200 bg-red-50 hover:bg-red-100 text-red-700"
                onClick={() => setIsRejectDialogOpen(true)}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Payment
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-md">
          <DialogHeader className="space-y-3 mb-6">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Verify Payment
            </DialogTitle>
            <p className="text-sm text-gray-500">
              Please enter the payment verification details below
            </p>
          </DialogHeader>
      
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Payment Method</Label>
              <RadioGroup
                value={verificationDetails.paymentMethod}
                onValueChange={value => 
                  setVerificationDetails(prev => ({...prev, paymentMethod: value}))
                }
                className="grid gap-3"
              >
                {[
                  { value: 'CASH', label: 'Cash' },
                  { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
                  { value: 'ONLINE', label: 'Online Payment' }
                ].map(option => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value.toLowerCase()} />
                    <Label htmlFor={option.value.toLowerCase()} className="flex-grow cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
      
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Reference Number
              </Label>
              <Input
                value={verificationDetails.referenceNumber}
                onChange={e => 
                  setVerificationDetails(prev => ({...prev, referenceNumber: e.target.value}))
                }
                placeholder="Enter payment reference number"
                className="w-full border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
      
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Payment Date
              </Label>
              <Input
                type="date"
                value={verificationDetails.paidDate}
                onChange={e => 
                  setVerificationDetails(prev => ({...prev, paidDate: e.target.value}))
                }
                className="w-full border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
      
          <DialogFooter className="mt-8 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsVerifyDialogOpen(false)}
              className="flex-1 border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerifyPayment}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Confirm Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reject Payment Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-md">
          <DialogHeader className="space-y-3 mb-6">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Reject Payment
            </DialogTitle>
            <p className="text-sm text-gray-500">
              Please provide a reason for rejecting this payment
            </p>
          </DialogHeader>
      
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Rejection Reason
            </Label>
            <Input
              value={verificationDetails.rejectionReason}
              onChange={e => 
                setVerificationDetails(prev => ({...prev, rejectionReason: e.target.value}))
              }
              placeholder="Enter reason for rejection"
              className="w-full border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
      
          <DialogFooter className="mt-8 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
              className="flex-1 border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectPayment}
              className="flex-1"
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6">
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default FinancePaymentVerification;
