
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ReportForm from '@/components/report/ReportForm';
import { FileText } from 'lucide-react';

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FileText className="h-10 w-10 text-orange-600 mx-auto mb-3" />
            <h1 className="text-3xl font-bold text-amber-900 mb-2">शिकायत दर्ज करें</h1>
            <p className="text-amber-800 max-w-2xl mx-auto">
              अपने आस-पास की घटनाओं की रिपोर्ट करके अपने शहर को सुरक्षित बनाने में मदद करें। आपकी जानकारी गोपनीय रखी जाएगी और हमारे अधिकारी जल्द ही आपसे संपर्क करेंगे।
            </p>
          </div>
          <ReportForm />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
