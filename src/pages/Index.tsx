
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import EmergencySOS from '@/components/home/EmergencySOS';
import RecentAlerts from '@/components/home/RecentAlerts';
import CrimeStatCard from '@/components/home/CrimeStatCard';
import { Button } from '@/components/ui/button';
import { FileText, MapPin, Shield, Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      <div className="container px-4 py-8 mx-auto">
        {/* Hero Section */}
        <div className="py-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-3 text-amber-900">
                  सुरक्षित नगर - Together for a Safer India
                </h1>
                <p className="text-lg text-amber-800 max-w-md">
                  Join our community effort to make our cities safer through easy reporting, real-time alerts, and local vigilance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-orange-600 hover:bg-orange-700"
                  size="lg"
                  asChild
                >
                  <Link to="/report">
                    <FileText className="mr-2 h-5 w-5" />
                    Report Incident
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild className="border-amber-600 text-amber-700 hover:bg-amber-50">
                  <Link to="/map">
                    <MapPin className="mr-2 h-5 w-5" />
                    View Safety Map
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-amber-200">
              <img 
                src="https://images.unsplash.com/photo-1524294040232-31fd4a68b249?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Safe neighborhood in India"
                className="w-full h-64 object-cover object-center"
              />
            </div>
          </div>
        </div>
        
        {/* Emergency SOS Button */}
        <div className="mb-8">
          <EmergencySOS />
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <CrimeStatCard 
            title="Monthly Incidents" 
            value="142" 
            trend="down" 
            trendValue="8%" 
            icon="shield"
            description="Steadily improving"
          />
          <CrimeStatCard 
            title="Response Time" 
            value="8.2 min" 
            trend="down" 
            trendValue="12%" 
            icon="shield"
            description="Faster than last month"
          />
          <CrimeStatCard 
            title="Active Alerts" 
            value="5" 
            trend="up" 
            trendValue="2" 
            icon="alert"
            description="Within 5 km radius"
          />
          <CrimeStatCard 
            title="Case Resolution" 
            value="74%" 
            trend="up" 
            trendValue="3%" 
            icon="shield"
            description="Improving steadily"
          />
        </div>
        
        {/* Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-amber-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-amber-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Report Incidents</h3>
              <p className="text-amber-800 mb-4">
                Easily submit reports about crimes or suspicious activities with location and photos.
              </p>
              <Link to="/report" className="text-orange-600 font-medium text-sm flex items-center hover:text-orange-700">
                Report Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="border border-amber-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-red-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Get Alerts</h3>
              <p className="text-amber-800 mb-4">
                Receive real-time notifications about incidents in your neighborhood or areas you care about.
              </p>
              <span className="text-orange-600 font-medium text-sm flex items-center">
                View Recent Alerts <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </div>
            
            <div className="border border-amber-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Track Progress</h3>
              <p className="text-amber-800 mb-4">
                Follow up on your reports and see how local authorities are addressing community concerns.
              </p>
              <Link to="/dashboard" className="text-orange-600 font-medium text-sm flex items-center hover:text-orange-700">
                View Dashboard <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Recent Alerts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-amber-900">Recent Alerts</h2>
          <RecentAlerts />
        </div>

        {/* CTA Section */}
        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8 md:p-12">
          <div className="md:max-w-md space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Join Surakshit Nagrik initiative
            </h2>
            <p className="opacity-90">
              Be part of making our mohallas safer. Report incidents, stay informed, and help your community thrive together.
            </p>
            <div className="pt-4">
              <Button variant="secondary" size="lg" className="bg-white text-amber-900 hover:bg-amber-100">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-amber-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-orange-600 mr-2" />
              <span className="text-lg font-semibold text-orange-800">सुरक्षित नगर</span>
            </div>
            <div className="text-sm text-amber-700">
              © 2025 सुरक्षित नगर. All rights reserved. <span className="mx-2">·</span> 
              <a href="#" className="hover:text-orange-700">Privacy Policy</a> <span className="mx-2">·</span> 
              <a href="#" className="hover:text-orange-700">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
