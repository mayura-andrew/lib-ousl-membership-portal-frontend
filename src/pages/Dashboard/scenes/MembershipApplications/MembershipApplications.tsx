import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, Check, X, Clock, BookOpen, IdCard, CreditCard, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

// Type definition for library membership
type LibraryMembership = {
  uuid: string;
  application: {
    title: string;
    first_name: string;
    last_name: string;
    full_name: string;
    reg_no: number;
    membership_type: string;
    student_id: string;
    faculty: string;
    course: string;
    level: string;
    personal_email: string;
    university_email: string;
    contact_no: number;
    profile_pic?: string;
  };
  state: 'pending' | 'approved' | 'rejected' | 'expired';
  payment_status: 'pending' | 'processing' | 'confirmed' | 'failed';
  membership_status: 'not_started' | 'processing' | 'active' | 'expired';
  payment_details?: {
    amount: number;
    payment_date?: string;
    payment_method?: string;
    reference_number?: string;
    confirmed_by?: string;
    confirmed_date?: string;
  };
  membership_details?: {
    membership_number?: string;
    start_date?: string;
    end_date?: string;
    created_by?: string;
    created_date?: string;
  };
  created_at: string;
  updated_at: string;
  status_updated_by?: string;
  status_updated_date?: string;
};

const ProcessTimeline: React.FC<{ data: LibraryMembership }> = ({ data }) => {
  const steps = [
    {
      label: 'Application Review',
      status: data.state === 'approved' ? 'complete' : 
              data.state === 'rejected' ? 'failed' : 'current',
      icon: <IdCard size={18} />
    },
    {
      label: 'Payment Processing',
      status: data.state !== 'approved' ? 'pending' :
              data.payment_status === 'confirmed' ? 'complete' :
              data.payment_status === 'failed' ? 'failed' : 'current',
      icon: <CreditCard size={18} />
    },
    {
      label: 'Membership Creation',
      status: data.payment_status !== 'confirmed' ? 'pending' :
              data.membership_status === 'active' ? 'complete' :
              data.membership_status === 'processing' ? 'current' : 'pending',
      icon: <CheckCircle2 size={18} />
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-col items-center w-1/3">
            <div className={`rounded-full p-2 ${
              step.status === 'complete' ? 'bg-green-100 text-green-600' :
              step.status === 'current' ? 'bg-blue-100 text-blue-600' :
              step.status === 'failed' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-400'
            }`}>
              {step.icon}
            </div>
            <div className="text-sm font-medium mt-2 text-center">{step.label}</div>
            <div className={`text-xs mt-1 ${
              step.status === 'complete' ? 'text-green-600' :
              step.status === 'current' ? 'text-blue-600' :
              step.status === 'failed' ? 'text-red-600' :
              'text-gray-400'
            }`}>
              {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
            </div>
          </div>
        ))}
      </div>
      <Progress value={
        data.state === 'approved' ? 
          data.payment_status === 'confirmed' ?
            data.membership_status === 'active' ? 100 : 66 
          : 33
        : data.state === 'rejected' ? 0 : 33
      } className="h-2" />
    </div>
  );
};

const PaymentStatus: React.FC<{ 
  data: LibraryMembershipData,
  onUpdatePayment: () => void 
}> = ({ data, onUpdatePayment }) => {
  const statusColors = {
    pending: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    processing: 'text-blue-700 bg-blue-50 border-blue-200',
    confirmed: 'text-green-700 bg-green-50 border-green-200',
    failed: 'text-red-700 bg-red-50 border-red-200'
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
          <Badge variant="outline" className={statusColors[data.payment_status]}>
            {data.payment_status.toUpperCase()}
          </Badge>
        </div>

        {data.payment_details && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">LKR {data.payment_details.amount.toFixed(2)}</span>
            </div>
            {data.payment_details.payment_date && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Date:</span>
                <span>{new Date(data.payment_details.payment_date).toLocaleDateString()}</span>
              </div>
            )}
            {data.payment_details.reference_number && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reference Number:</span>
                <span>{data.payment_details.reference_number}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {data.state === 'approved' && data.payment_status === 'pending' && (
        <CardFooter className="bg-gray-50 p-4">
          <Button 
            onClick={onUpdatePayment}
            className="w-full"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Confirm Payment Receipt
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const MembershipStatus: React.FC<{ 
  data: LibraryMembership,
  onCreateMembership: () => void 
}> = ({ data, onCreateMembership }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Membership Details</h2>
          <Badge variant="outline" className={
            data.membership_status === 'active' ? 'bg-green-100 text-green-800' :
            data.membership_status === 'processing' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }>
            {data.membership_status.toUpperCase().replace('_', ' ')}
          </Badge>
        </div>

        {data.membership_details ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Membership Number:</span>
              <span className="font-semibold">{data.membership_details.membership_number}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valid From:</span>
              <span>{new Date(data.membership_details.start_date!).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valid Until:</span>
              <span>{new Date(data.membership_details.end_date!).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          data.payment_status === 'confirmed' && (
            <CardFooter className="bg-gray-50 p-4">
              <Button 
                onClick={onCreateMembership}
                className="w-full"
              >
                <Check className="w-4 h-4 mr-2" />
                Create Membership
              </Button>
            </CardFooter>
          )
        )}
      </CardContent>
    </Card>
  );
};

const MembershipApplication: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 12;
  const [data, setData] = useState<LibraryMembership | null>(null);

  const memberships: LibraryMembership[] = [
    {
      uuid: '1',
      application: {
        title: 'Mr',
        first_name: 'John',
        last_name: 'Doe',
        full_name: 'John Michael Doe',
        reg_no: 123456,
        membership_type: 'UNDERGRADUATE',
        student_id: 'OU56789',
        faculty: 'Natural Sciences',
        course: 'BSc in Computer Science',
        level: 'Level 5',
        personal_email: 'john.doe@gmail.com',
        university_email: 'john.d@university.edu',
        contact_no: 94701234567,
        profile_pic: '/api/placeholder/100/100'
      },
      state: 'pending',
      payment_status: 'pending',
      membership_status: 'not_started',
      created_at: '2024-02-05T10:00:00Z',
      updated_at: '2024-02-05T10:00:00Z'
    },
    {
      uuid: '2',
      application: {
        title: 'Ms',
        first_name: 'Sarah',
        last_name: 'Smith',
        full_name: 'Sarah Jane Smith',
        reg_no: 123457,
        membership_type: 'POSTGRADUATE',
        student_id: 'OU56790',
        faculty: 'Engineering',
        course: 'MSc in Civil Engineering',
        level: 'Level 6',
        personal_email: 'sarah.smith@gmail.com',
        university_email: 'sarah.s@university.edu',
        contact_no: 94701234568,
        profile_pic: '/api/placeholder/101/101'
      },
      state: 'approved',
      payment_status: 'confirmed',
      membership_status: 'active',
      payment_details: {
        amount: 2500.00,
        payment_date: '2024-02-05T14:30:00Z',
        payment_method: 'BANK_TRANSFER',
        reference_number: 'PAY-123456',
        confirmed_by: 'Finance Admin',
        confirmed_date: '2024-02-05T15:00:00Z'
      },
      membership_details: {
        membership_number: 'MEM-2024-001',
        start_date: '2024-02-05T15:00:00Z',
        end_date: '2025-02-05T15:00:00Z',
        created_by: 'Library Admin',
        created_date: '2024-02-05T15:00:00Z'
      },
      created_at: '2024-02-04T09:00:00Z',
      updated_at: '2024-02-05T15:00:00Z',
      status_updated_by: 'Library Admin',
      status_updated_date: '2024-02-05T15:00:00Z'
    },
    {
      uuid: '3',
      application: {
        title: 'Dr',
        first_name: 'David',
        last_name: 'Wilson',
        full_name: 'David Wilson',
        reg_no: 123458,
        membership_type: 'STAFF',
        student_id: 'OU56791',
        faculty: 'Medicine',
        course: 'MBBS',
        level: 'Level 7',
        personal_email: 'david.wilson@gmail.com',
        university_email: 'david.w@university.edu',
        contact_no: 94701234569,
        profile_pic: '/api/placeholder/102/102'
      },
      state: 'rejected',
      payment_status: 'failed',
      membership_status: 'not_started',
      payment_details: {
        amount: 3000.00,
        payment_method: 'ONLINE',
        reference_number: 'PAY-123457'
      },
      created_at: '2024-02-03T11:00:00Z',
      updated_at: '2024-02-04T16:45:00Z',
      status_updated_by: 'Library Admin',
      status_updated_date: '2024-02-04T16:45:00Z'
    },
    {
      uuid: '4',
      application: {
        title: 'Mrs',
        first_name: 'Emma',
        last_name: 'Brown',
        full_name: 'Emma Brown',
        reg_no: 123459,
        membership_type: 'UNDERGRADUATE',
        student_id: 'OU56792',
        faculty: 'Management',
        course: 'BBA in Marketing',
        level: 'Level 4',
        personal_email: 'emma.brown@gmail.com',
        university_email: 'emma.b@university.edu',
        contact_no: 94701234570,
        profile_pic: '/api/placeholder/103/103'
      },
      state: 'expired',
      payment_status: 'confirmed',
      membership_status: 'expired',
      payment_details: {
        amount: 2000.00,
        payment_date: '2023-02-05T10:00:00Z',
        payment_method: 'CASH',
        reference_number: 'PAY-123458',
        confirmed_by: 'Finance Admin',
        confirmed_date: '2023-02-05T10:30:00Z'
      },
      membership_details: {
        membership_number: 'MEM-2023-001',
        start_date: '2023-02-05T10:30:00Z',
        end_date: '2024-02-05T10:30:00Z',
        created_by: 'Library Admin',
        created_date: '2023-02-05T10:30:00Z'
      },
      created_at: '2023-02-05T10:00:00Z',
      updated_at: '2024-02-05T10:30:00Z',
      status_updated_by: 'System',
      status_updated_date: '2024-02-05T10:30:00Z'
    }
  ];

    
  useEffect(() => {
    // Set initial data to first membership in the list
    setData(memberships[0]);
  }, []);


  const { ref, inView } = useInView();

  
  // Mock data loading states
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const stats = {
    all: 156,
    pending: 23,
    approved: 98,
    rejected: 15,
    expired: 20
  };

  const handleConfirmPayment = async () => {
    setData(prev => prev ? {
      ...prev,
      payment_status: 'confirmed',
      payment_details: {
        amount: 1000.00,
        payment_date: new Date().toISOString(),
        reference_number: 'PAY-' + Math.random().toString(36).substr(2, 9),
        confirmed_by: 'Finance Admin',
        confirmed_date: new Date().toISOString()
      }
    } : null);
  };

  if (isLoading || !data) {
    return <LoadingSkeleton />;
  }

  const handleCreateMembership = async () => {
    setData(prev => prev ? {
      ...prev,
      membership_status: 'active',
      membership_details: {
        membership_number: 'MEM-' + Math.random().toString(36).substr(2, 9),
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: 'Library Admin',
        created_date: new Date().toISOString()
      }
    } : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'expired':
        return <BookOpen className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-6">
            {/* Header with Stats */}
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Library Membership Application Requests</h1>
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        {/* Simplified Stats Row */}
        <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          {[
            { label: 'Total Applications', count: stats.all, status: '', color: 'text-gray-600' },
            { label: 'Pending', count: stats.pending, status: 'pending', color: 'text-yellow-600' },
            { label: 'Approved', count: stats.approved, status: 'approved', color: 'text-green-600' },
            { label: 'Rejected', count: stats.rejected, status: 'rejected', color: 'text-red-600' },
            { label: 'Expired', count: stats.expired, status: 'expired', color: 'text-gray-500' }
          ].map((stat, idx) => (
            <button
              key={stat.label}
              onClick={() => setFilter(stat.status)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                filter === stat.status ? 'bg-orange-50 ring-1 ring-orange-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-start">
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.count}</span>
                <span className="text-xs text-gray-500">{stat.label}</span>
              </div>
              {idx !== 0 && getStatusIcon(stat.status)}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, ID, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Registration</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Faculty & Course</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {memberships.map((membership) => (
              <tr key={membership.uuid} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                      src={membership.application.profile_pic}
                      alt=""
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{membership.application.full_name}</div>
                      <div className="text-sm text-gray-500">{membership.application.university_email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{membership.application.reg_no}</div>
                  <div className="text-sm text-gray-500">{membership.application.student_id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{membership.application.faculty}</div>
                  <div className="text-sm text-gray-500">{membership.application.course}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(membership.state)}`}>
                    {getStatusIcon(membership.state)}
                    {membership.state.charAt(0).toUpperCase() + membership.state.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/dashboard/memberships/${membership.uuid}`}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isFetchingNextPage && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent"></div>
          </div>
        )}

        <div ref={ref} className="h-4" />
      </div>
    </div>
  );
};

export default MembershipApplication;