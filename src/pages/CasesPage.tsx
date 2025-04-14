
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import CaseManagement from '@/components/cases/CaseManagement';
import { BadgeAlert } from 'lucide-react';

const CasesPage = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center mb-6">
            <BadgeAlert className="h-8 w-8 text-orange-700 mr-2" />
            <h1 className="text-2xl font-bold text-amber-900">Case File Management</h1>
          </div>
          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
            <div className="mb-4">
              <p className="text-amber-800">
                Welcome to the case management system. Here you can track all reported incidents and manage investigations across different localities.
              </p>
            </div>
            <CaseManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesPage;
