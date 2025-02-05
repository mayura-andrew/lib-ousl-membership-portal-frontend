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

interface PaymentVerificationData {
  id: string;
  application: {
    full_name: string;
    reg_no: number;
    faculty: string;
    student_id: string;
    membership_type: string;
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

const PaymentStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const variants = {
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
          membership_type: 'UNDERGRADUATE'
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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Verification</h1>
              <p className="text-sm text-gray-500">Application ID: {data.id}</p>
            </div>
            <PaymentStatusBadge status={data.payment.status} />
          </div>

          {/* Applicant Details */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-1">
              <Label className="text-sm text-gray-500">Applicant Name</Label>
              <p className="font-medium">{data.application.full_name}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-500">Student ID</Label>
              <p className="font-medium">{data.application.student_id}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-500">Faculty</Label>
              <p className="font-medium">{data.application.faculty}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-500">Membership Type</Label>
              <p className="font-medium">{data.application.membership_type}</p>
            </div>
          </div>

          {/* Payment Details */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-900">Payment Details</h2>
                <div className="text-2xl font-bold text-gray-900">
                  LKR {data.payment.amount.toFixed(2)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {data.payment.due_date && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays size={16} />
                    <span>Due: {new Date(data.payment.due_date).toLocaleDateString()}</span>
                  </div>
                )}
                {data.payment.payment_method && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Receipt size={16} />
                    <span>Method: {data.payment.payment_method.replace('_', ' ')}</span>
                  </div>
                )}
                {data.payment.reference_number && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard size={16} />
                    <span>Ref: {data.payment.reference_number}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>

        {data.payment.status === 'pending' && (
          <CardFooter className="p-6 bg-gray-50 space-x-3">
            <Button
              variant="outline"
              className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
              onClick={() => setIsVerifyDialogOpen(true)}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Verify Payment
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
              onClick={() => setIsRejectDialogOpen(true)}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Payment
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Verify Payment Dialog */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                value={verificationDetails.paymentMethod}
                onValueChange={value => 
                  setVerificationDetails(prev => ({...prev, paymentMethod: value}))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="CASH" id="cash" />
                  <Label htmlFor="cash">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BANK_TRANSFER" id="bank" />
                  <Label htmlFor="bank">Bank Transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ONLINE" id="online" />
                  <Label htmlFor="online">Online Payment</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Reference Number</Label>
              <Input
                value={verificationDetails.referenceNumber}
                onChange={e => 
                  setVerificationDetails(prev => ({...prev, referenceNumber: e.target.value}))
                }
                placeholder="Enter payment reference number"
              />
            </div>
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Input
                type="date"
                value={verificationDetails.paidDate}
                onChange={e => 
                  setVerificationDetails(prev => ({...prev, paidDate: e.target.value}))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifyPayment}>Confirm Verification</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Payment Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Input
                value={verificationDetails.rejectionReason}
                onChange={e => 
                  setVerificationDetails(prev => ({...prev, rejectionReason: e.target.value}))
                }
                placeholder="Enter reason for rejection"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectPayment}>
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
