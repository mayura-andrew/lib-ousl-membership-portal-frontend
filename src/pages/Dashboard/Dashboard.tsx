import { Link, Route, Routes } from 'react-router-dom';
import MembershipApplications from './scenes/MembershipApplications/MembershipApplications';
import MembershipApplicationPage from './scenes/MembershipApplications/MembershipApplicationPage';
import Inquiries from './scenes/Inquiries/Inquiry';
import MembershipApplicationDetail from '@/components/MembershipApplication/MembershipApplication';
import FinancePaymentVerification from './scenes/FinanceDivision';
const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-50 h-full">
        <nav className="h-full">
          <ul className="space-y-2 p-4">
            <li>
              <Link
                to="/admin/dashboard/membership-applications"
                className="block py-2 px-4 rounded hover:bg-gray-200"
              >
                Membership Applications
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/inquiries"
                className="block py-2 px-4 rounded hover:bg-gray-200"
              >
                Inquiries
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/manage-users"
                className="block py-2 px-4 rounded hover:bg-gray-200"
              >
                Manage Users
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/membership-applications" element={<MembershipApplications />} />
          <Route
            path="/membership-applications/:membershipID"
            element={<MembershipApplicationPage />}
          />
          <Route
            path="/memberships/:membershipID"
            element={<MembershipApplicationDetail />}
          />
          <Route path="/inqueries" element={<Inquiries />} />
          <Route 
            path="/payments/:membershipId" 
            element={<FinancePaymentVerification />} 
          />

        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
