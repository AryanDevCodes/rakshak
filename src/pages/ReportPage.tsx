
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ReportForm from '@/components/report/ReportForm';

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-amber-900">Report an Incident</h1>
            <p className="text-amber-800 mt-2">
              Help make your locality safer by reporting incidents. Your information will be kept confidential.
            </p>
          </div>
          <ReportForm />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
