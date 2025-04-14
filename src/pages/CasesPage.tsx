
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import CaseManagement from '@/components/cases/CaseManagement';
import { BadgeAlert } from 'lucide-react';

const CasesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center mb-6">
            <BadgeAlert className="h-8 w-8 text-police-700 mr-2" />
            <h1 className="text-2xl font-bold">Case Management</h1>
          </div>
          <CaseManagement />
        </div>
      </div>
    </div>
  );
};

export default CasesPage;
