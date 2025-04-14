
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import OfficerDashboard from '@/components/dashboard/OfficerDashboard';
import { Shield } from 'lucide-react'; 

const DashboardPage = () => {
  const { role } = useAuth();
  
  // Determine dashboard title based on user role
  const getDashboardTitle = () => {
    if (role === 'admin') {
      return "प्रशासन नियंत्रण कक्ष (Administrative Control Room)";
    }
    return "अधिकारी नियंत्रण कक्ष (Officer Control Room)";
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Shield className="h-8 w-8 text-orange-700 mr-2" />
          <h1 className="text-2xl font-bold text-amber-900">{getDashboardTitle()}</h1>
        </div>
        <OfficerDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
