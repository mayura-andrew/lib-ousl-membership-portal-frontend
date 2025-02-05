import { Link, Route, Routes } from 'react-router-dom';
import MembershipApplications from './scenes/MembershipApplications/MembershipApplications';
import Inquiries from './scenes/Inquiries/Inquiry';
import MembershipApplicationDetail from '@/components/MembershipApplication/MembershipApplication';
import FinancePaymentVerification from './scenes/FinanceDivision';
import FinanceApplications from './scenes/FinanceDivision/FinanceApplications';
// src/pages/Dashboard/Dashboard.tsx
const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard/membership-applications"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                Membership Applications
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/finance/applications"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                Payment Verifications
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/inquiries"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                Inquiries
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
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
      </main>
    </div>
  );
};


export default Dashboard;
