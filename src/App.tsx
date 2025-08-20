import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { OrderProvider } from './context/OrderContext';
import { ContentProvider } from './context/ContentContext';
import { ServiceProvider } from './context/ServiceContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/services/ServiceDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import PolicyPage from './pages/PolicyPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import { ABOUT_US_CONTENT, PRIVACY_POLICY_CONTENT, REFUND_POLICY_CONTENT } from './constants';
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminEditContentPage from './pages/admin/AdminEditContentPage';
import AdminEditServicePage from './pages/admin/AdminEditServicePage';


const AppLayout = () => (
  <div className="flex flex-col min-h-screen bg-[#121212] text-white">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);


function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <WalletProvider>
          <OrderProvider>
            <ContentProvider>
              <ServiceProvider>
                <HashRouter>
                  <Routes>
                    <Route element={<AppLayout />}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/services/:slug" element={<ServiceDetailPage />} />
                      <Route path="/about" element={<AboutUsPage />} />
                      <Route path="/account" element={<AccountPage />} />
                      <Route path="/orders" element={<OrdersPage />} />
                      <Route path="/privacy-policy" element={<PolicyPage title="Privacy Policy" content={PRIVACY_POLICY_CONTENT} />} />
                      <Route path="/refund-policy" element={<PolicyPage title="Refund Policy" content={REFUND_POLICY_CONTENT} />} />
                    </Route>
                    <Route path="/admin" element={
                      <AdminRoute>
                        <AdminLayout />
                      </AdminRoute>
                    }>
                        <Route index element={<AdminDashboardPage />} />
                        <Route path="orders" element={<AdminOrdersPage />} />
                        <Route path="users" element={<AdminUsersPage />} />
                        <Route path="services" element={<AdminServicesPage />} />
                        <Route path="services/edit/:serviceId" element={<AdminEditServicePage />} />
                        <Route path="content" element={<AdminContentPage />} />
                        <Route path="content/edit/:slug" element={<AdminEditContentPage />} />
                    </Route>
                  </Routes>
                </HashRouter>
              </ServiceProvider>
            </ContentProvider>
          </OrderProvider>
        </WalletProvider>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;