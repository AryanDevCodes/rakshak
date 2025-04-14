
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import CaseManagement from '@/components/cases/CaseManagement';
import { Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CasesPage = () => {
  const { role } = useAuth();
  
  // Set page title based on user role
  const pageTitle = role === 'admin' 
    ? "केस फ़ाइल प्रबंधन (Admin Case Management)"
    : "केस फ़ाइल प्रबंधन (Case File Management)";
  
  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center mb-6">
            <Briefcase className="h-8 w-8 text-orange-700 mr-2" />
            <h1 className="text-2xl font-bold text-amber-900">{pageTitle}</h1>
          </div>
          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
            <div className="mb-4">
              <p className="text-amber-800">
                Case management system welcomes you. Here you can track all reported incidents and manage investigations across different locations.
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
