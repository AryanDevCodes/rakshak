
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Shield, AlertCircle, Map, User, Menu, X, LifeBuoy, FileText, Home
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5 mr-2" /> },
    { name: 'Report Crime', path: '/report', icon: <FileText className="h-5 w-5 mr-2" /> },
    { name: 'Emergency', path: '/emergency', icon: <AlertCircle className="h-5 w-5 mr-2" /> },
    { name: 'Map', path: '/map', icon: <Map className="h-5 w-5 mr-2" /> },
    { name: 'Officer Dashboard', path: '/dashboard', icon: <Shield className="h-5 w-5 mr-2" /> },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-police-700" />
            <span className="text-xl font-bold text-police-700">SafeCity</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="flex items-center text-gray-700 hover:text-police-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Button variant="outline" size="sm" className="ml-4">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  <Button className="mt-4">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
