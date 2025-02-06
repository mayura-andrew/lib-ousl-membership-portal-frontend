import { Link, Route, Routes } from 'react-router-dom';
import MembershipApplications from './scenes/MembershipApplications/MembershipApplications';
import Inquiries from './scenes/Inquiries/Inquiry';
import MembershipApplicationDetail from '@/components/MembershipApplication/MembershipApplication';
import FinancePaymentVerification from './scenes/FinanceDivision';
import FinanceApplications from './scenes/FinanceDivision/FinanceApplications';
const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - reduced width */}
      <aside className="fixed inset-y-0 left-0 w-56 bg-white border-r border-gray-200 flex flex-col">
        {/* Header - reduced height */}
        <div className="h-14 px-4 border-b border-gray-200 flex items-center">
          <h1 className="text-base font-semibold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Navigation - improved spacing */}
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

      {/* Main Content - adjusted margin and padding */}
      <main className="flex-1 ml-56 min-h-screen">
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
