
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import CrimeMap from '@/components/map/CrimeMap';
import { MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CrimeMapPage = () => {
  const { permissions } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <MapPin className="h-8 w-8 text-police-700 mr-2" />
          <h1 className="text-2xl font-bold">Crime Mapping System</h1>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600">
            Explore reported incidents across the city with our interactive crime mapping tool. 
            This visual representation helps identify patterns and hotspots.
            {permissions.canAccessAnalytics && (
              <span> Advanced analytics and predictive features are available for authorized personnel.</span>
            )}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <CrimeMap />
        </div>
      </div>
    </div>
  );
};

export default CrimeMapPage;
