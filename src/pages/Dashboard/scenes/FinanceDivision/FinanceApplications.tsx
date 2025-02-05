// src/pages/Dashboard/scenes/FinanceDivision/FinanceApplications.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Check, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const FinanceApplications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const stats = {
    all: 45,
    pending: 23,
    verified: 15,
    rejected: 7
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const memberships = [
    {
      uuid: '1',
      application: {
        full_name: 'John Doe',
        student_id: 'OU56789',
        profile_pic: '/api/placeholder/100/100'
      },
      state: 'approved',
      payment_status: 'pending',
      payment_details: {
        amount: 2500.00
      }
    },
    {
      uuid: '2',
      application: {
        full_name: 'Sarah Smith',
        student_id: 'OU56790',
        profile_pic: '/api/placeholder/101/101'
      },
      state: 'approved',
      payment_status: 'verified',
      payment_details: {
        amount: 3000.00
      }
    },
    // Add more membership objects as needed
  ];
  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Finance Applications</h1>
        {/* Stats */}
        <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          {[
            { label: 'All Applications', count: stats.all, status: '', color: 'text-gray-600' },
            { label: 'Pending', count: stats.pending, status: 'pending', color: 'text-yellow-600' },
            { label: 'Verified', count: stats.verified, status: 'verified', color: 'text-green-600' },
            { label: 'Rejected', count: stats.rejected, status: 'rejected', color: 'text-red-600' }
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
              {idx !== 0 && getPaymentStatusIcon(stat.status)}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or reference..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {memberships
              .filter(m => m.state === 'approved')
              .map((membership) => (
                <tr key={membership.uuid} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                        src={membership.application.profile_pic}
                        alt=""
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {membership.application.full_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {membership.application.student_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      LKR {membership.payment_details?.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {new Date().toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={getPaymentStatusColor(membership.payment_status)}
                    >
                      {getPaymentStatusIcon(membership.payment_status)}
                      <span className="ml-1">
                        {membership.payment_status.toUpperCase()}
                      </span>
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/dashboard/finance/payments/${membership.uuid}`}
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      Verify Payment →
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceApplications;