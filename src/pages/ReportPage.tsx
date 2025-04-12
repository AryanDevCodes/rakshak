
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ReportForm from '@/components/report/ReportForm';

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ReportForm />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
