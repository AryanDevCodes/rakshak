
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import IncidentMap from '@/components/map/IncidentMap';

const MapPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Crime Incident Map</h1>
        <p className="text-muted-foreground mb-6">
          View recent incidents and reports in your area
        </p>
        
        <IncidentMap />
      </div>
    </div>
  );
};

export default MapPage;
