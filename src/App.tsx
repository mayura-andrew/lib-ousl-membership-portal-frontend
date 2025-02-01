import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './components/Layout/MainLayout';
import MembershipApplication from './pages/MembershipApplication';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
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
  );
}

export default App;