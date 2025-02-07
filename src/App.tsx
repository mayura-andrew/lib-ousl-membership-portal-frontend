import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './components/Layout/MainLayout';
import MembershipApplication from './pages/MembershipApplication';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import { NotificationProvider } from './contexts/NotificationContext';
import { NotificationDropdown } from './components/Notifications/NotificationDropdown';

const queryClient = new QueryClient();

function App() {
  return (
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainLayout>
          <NotificationDropdown />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                    path="/membership-application"
                    element={<MembershipApplication />}
              />
              <Route path="/admin/dashboard/*" element={<Dashboard />} />

            </Routes>
          </MainLayout>
        </BrowserRouter>
      </QueryClientProvider>
    </NotificationProvider>
  );
}

export default App;