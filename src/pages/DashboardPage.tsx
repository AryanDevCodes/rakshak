
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import OfficerDashboard from '@/components/dashboard/OfficerDashboard';
import { Shield } from 'lucide-react'; 

const DashboardPage = () => {
  const { role } = useAuth();
  
  const getDashboardTitle = () => {
    if (role === 'admin') {
      return "Administrative Control Room";
    }
    return "Officer Control Room";
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
          <div className="mb-4">
            <p className="text-amber-800">
              Welcome to the control room. Here you can monitor all activities, respond to incidents, and manage your team's operations.
            </p>
          </div>
          <OfficerDashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
