
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import OfficerDashboard from '@/components/dashboard/OfficerDashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <OfficerDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
