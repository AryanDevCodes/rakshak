
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Shield, AlertCircle, Map, Menu, Home, FileText, LogIn, UserPlus,
  BadgeAlert, Users, Settings, BarChart3, ScrollText, ShieldAlert
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';
import UserProfile from '@/components/auth/UserProfile';

const Navbar = () => {
  const { isAuthenticated, role, permissions } = useAuth();
  const navigate = useNavigate();
  
  // Define base navigation items available to all users
  const baseNavItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5 mr-2" /> },
  ];
  
  // Define role-specific navigation items
  const userNavItems = [
    { name: 'Report Crime', path: '/report', icon: <FileText className="h-5 w-5 mr-2" /> },
    { name: 'Emergency', path: '/emergency', icon: <AlertCircle className="h-5 w-5 mr-2" /> },
    { name: 'Map', path: '/map', icon: <Map className="h-5 w-5 mr-2" /> },
  ];
  
  const officerNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Shield className="h-5 w-5 mr-2" /> },
    { name: 'Incidents', path: '/incidents', icon: <BadgeAlert className="h-5 w-5 mr-2" /> },
    { name: 'Map', path: '/map', icon: <Map className="h-5 w-5 mr-2" /> },
  ];
  
  const adminNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Shield className="h-5 w-5 mr-2" /> },
    { name: 'Users', path: '/users', icon: <Users className="h-5 w-5 mr-2" /> },
    { name: 'Reports', path: '/reports', icon: <ScrollText className="h-5 w-5 mr-2" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 className="h-5 w-5 mr-2" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5 mr-2" /> },
  ];
  
  // Combine base items with role-specific items
  let navItems = [...baseNavItems];
  if (isAuthenticated) {
    if (role === 'user') {
      navItems = [...navItems, ...userNavItems];
    } else if (role === 'officer') {
      navItems = [...navItems, ...officerNavItems];
    } else if (role === 'admin') {
      navItems = [...navItems, ...adminNavItems];
    }
  } else {
    // For non-authenticated users, show some public nav items
    navItems = [...navItems, 
      { name: 'Emergency', path: '/emergency', icon: <AlertCircle className="h-5 w-5 mr-2" /> },
      { name: 'Map', path: '/map', icon: <Map className="h-5 w-5 mr-2" /> }
    ];
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-police-700" />
              <span className="text-xl font-bold text-police-700">SafeCity</span>
            </Link>
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
            
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-police-700 hover:bg-police-800"
                  onClick={() => navigate('/signup')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            {isAuthenticated ? (
              <div className="mr-4">
                <UserProfile />
              </div>
            ) : (
              <div className="flex items-center space-x-2 mr-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="px-1"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="px-1"
                  onClick={() => navigate('/signup')}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            )}
            
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
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  
                  {!isAuthenticated && (
                    <div className="flex flex-col space-y-2 mt-4">
                      <Button 
                        onClick={() => navigate('/login')}
                        className="justify-start"
                        variant="outline"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                      <Button 
                        onClick={() => navigate('/signup')}
                        className="justify-start bg-police-700"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up
                      </Button>
                    </div>
                  )}
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
