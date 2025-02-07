// src/pages/Dashboard/Dashboard.tsx
import { Link, Route, Routes } from 'react-router-dom';
import { NotificationDropdown } from '@/components/Notifications/NotificationDropdown';
import MembershipApplications from './scenes/MembershipApplications/MembershipApplications';
import Inquiries from './scenes/Inquiries/Inquiry';
import MembershipApplicationDetail from '@/components/MembershipApplication/MembershipApplication';
import FinancePaymentVerification from './scenes/FinanceDivision';
import FinanceApplications from './scenes/FinanceDivision/FinanceApplications';
import { format } from 'date-fns';

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Good Morning';
  if (currentHour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-56 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="h-14 px-4 border-b border-gray-200 flex items-center">
          <h1 className="text-base font-semibold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                to="/admin/dashboard/membership-applications"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                Membership Applications
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/finance/applications"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                Payment Verifications
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/inquiries"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                Inquiries
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-56 min-h-screen">
        {/* Header with Notifications */}
        <div className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-500">
          {getGreeting()}, Admin
        </p>
        <h3 className="text-xl font-bold text-gray-900">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </h3>
      </div>
            </div>
            <div className="flex items-center gap-4">
              <NotificationDropdown />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Routes>
            <Route path="/membership-applications" element={<MembershipApplications />} />
            <Route
              path="/finance/applications"
              element={<FinanceApplications />}
            />
            <Route 
              path="/finance/payments/:membershipId" 
              element={<FinancePaymentVerification />} 
            />
            <Route
              path="/memberships/:membershipId"
              element={<MembershipApplicationDetail />}
            />
            <Route path="/inquiries" element={<Inquiries />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;