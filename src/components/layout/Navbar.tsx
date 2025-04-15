
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Shield, AlertCircle, Map, Menu, Home, FileText, LogIn, UserPlus,
  BadgeAlert, Users, Settings, BarChart3, ScrollText, ShieldAlert, Briefcase
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
  const location = useLocation();
  
  // Define base navigation items available to all users
  const baseNavItems = [
    { name: 'मुख्य पृष्ठ (Home)', path: '/', icon: <Home className="h-5 w-5 mr-2" /> },
  ];
  
  // Define role-specific navigation items with Indian terminology
  const userNavItems = [
    { name: 'शिकायत दर्ज करें (Report)', path: '/report', icon: <FileText className="h-5 w-5 mr-2" /> },
    { name: 'आपातकालीन सहायता (Emergency)', path: '/emergency', icon: <AlertCircle className="h-5 w-5 mr-2" /> },
    { name: 'सुरक्षा मानचित्र (Safety Map)', path: '/map', icon: <Map className="h-5 w-5 mr-2" /> },
  ];
  
  const officerNavItems = [
    { name: 'नियंत्रण कक्ष (Control Room)', path: '/officer/dashboard', icon: <Shield className="h-5 w-5 mr-2" /> },
    { name: 'अपराध रिपोर्ट (Reports)', path: '/incidents', icon: <BadgeAlert className="h-5 w-5 mr-2" /> },
    { name: 'केस फाइल (Case Files)', path: '/officer/cases', icon: <Briefcase className="h-5 w-5 mr-2" /> },
    { name: 'सुरक्षा मानचित्र (Safety Map)', path: '/map', icon: <Map className="h-5 w-5 mr-2" /> },
  ];
  
  const adminNavItems = [
    { name: 'प्रशासन कक्ष (Admin Room)', path: '/admin/dashboard', icon: <Shield className="h-5 w-5 mr-2" /> },
    { name: 'उपयोगकर्ता (Users)', path: '/users', icon: <Users className="h-5 w-5 mr-2" /> },
    { name: 'सभी रिपोर्ट (All Reports)', path: '/reports', icon: <ScrollText className="h-5 w-5 mr-2" /> },
    { name: 'केस प्रबंधन (Case Management)', path: '/admin/cases', icon: <Briefcase className="h-5 w-5 mr-2" /> },
    { name: 'विश्लेषण (Analytics)', path: '/analytics', icon: <BarChart3 className="h-5 w-5 mr-2" /> },
    { name: 'सेटिंग्स (Settings)', path: '/settings', icon: <Settings className="h-5 w-5 mr-2" /> },
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
      { name: 'आपातकालीन सहायता (Emergency)', path: '/emergency', icon: <AlertCircle className="h-5 w-5 mr-2" /> },
      { name: 'सुरक्षा मानचित्र (Safety Map)', path: '/map', icon: <Map className="h-5 w-5 mr-2" /> }
    ];
  }

  // Function to check if a link is active
  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-orange-50 shadow-sm border-b border-amber-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold text-orange-800">सुरक्षित नगर</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center transition-colors ${
                  isActiveLink(item.path) 
                    ? 'text-orange-600 font-semibold' 
                    : 'text-amber-800 hover:text-orange-600'
                }`}
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
                  className="border-amber-600 text-amber-700 hover:bg-amber-50"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  लॉगिन (Login)
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => navigate('/signup')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  पंजीकरण (Sign Up)
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
                  className="px-1 text-amber-700"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="px-1 text-amber-700"
                  onClick={() => navigate('/signup')}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-amber-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-orange-50 border-l border-amber-200">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center py-2 px-4 rounded-md hover:bg-amber-100 ${
                        isActiveLink(item.path) 
                          ? 'bg-amber-100 text-orange-600 font-semibold' 
                          : 'text-amber-800'
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  
                  {!isAuthenticated && (
                    <div className="flex flex-col space-y-2 mt-4">
                      <Button 
                        onClick={() => navigate('/login')}
                        className="justify-start border-amber-600 text-amber-700 hover:bg-amber-50"
                        variant="outline"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        लॉगिन (Login)
                      </Button>
                      <Button 
                        onClick={() => navigate('/signup')}
                        className="justify-start bg-orange-600 hover:bg-orange-700"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        पंजीकरण (Sign Up)
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
