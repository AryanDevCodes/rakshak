
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import OfficerDashboard from '@/components/dashboard/OfficerDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Shield } from 'lucide-react'; 

const DashboardPage = () => {
  const { role } = useAuth();
  
  const getDashboardTitle = () => {
    if (role === 'admin') {
      return "Administrative Control Center";
    }
    return "Officer Control Center";
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Shield className="h-8 w-8 text-orange-700 mr-2" />
          <h1 className="text-2xl font-bold text-amber-900">{getDashboardTitle()}</h1>
        </div>
        <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
          {role === 'admin' ? <AdminDashboard /> : <OfficerDashboard />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
