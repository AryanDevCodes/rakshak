
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/api';
import { toast } from '@/hooks/use-toast';

// Define user roles
export type UserRole = 'user' | 'officer' | 'admin' | null;

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  badge?: string;
  avatar?: string;
  aadharVerified?: boolean;
  performanceRating?: number;
}

// Define permissions for each role
export interface RolePermissions {
  canViewDashboard: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canApproveReports: boolean;
  canEditAlerts: boolean;
  canViewMap: boolean;
  canAccessAnalytics: boolean;
  canViewPerformanceInsights: boolean;
  canUsePredictiveAnalysis: boolean;
  canViewOfficerPerformance: boolean;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  permissions: RolePermissions;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, aadharNumber?: string) => Promise<void>;
  loginWithAadhar: (aadharNumber: string, otp: string) => Promise<void>;
  loginAnonymously: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Default permissions based on role
const getRolePermissions = (role: UserRole): RolePermissions => {
  switch (role) {
    case 'admin':
      return {
        canViewDashboard: true,
        canViewReports: true,
        canManageUsers: true,
        canApproveReports: true,
        canEditAlerts: true,
        canViewMap: true,
        canAccessAnalytics: true,
        canViewPerformanceInsights: true,
        canUsePredictiveAnalysis: true,
        canViewOfficerPerformance: true,
      };
    case 'officer':
      return {
        canViewDashboard: true,
        canViewReports: true,
        canManageUsers: false,
        canApproveReports: true,
        canEditAlerts: true,
        canViewMap: true,
        canAccessAnalytics: false,
        canViewPerformanceInsights: false,
        canUsePredictiveAnalysis: false,
        canViewOfficerPerformance: false,
      };
    case 'user':
      return {
        canViewDashboard: false,
        canViewReports: true,
        canManageUsers: false,
        canApproveReports: false,
        canEditAlerts: false,
        canViewMap: true,
        canAccessAnalytics: false,
        canViewPerformanceInsights: false,
        canUsePredictiveAnalysis: false,
        canViewOfficerPerformance: false,
      };
    default:
      return {
        canViewDashboard: false,
        canViewReports: false,
        canManageUsers: false,
        canApproveReports: false,
        canEditAlerts: false,
        canViewMap: false,
        canAccessAnalytics: false,
        canViewPerformanceInsights: false,
        canUsePredictiveAnalysis: false,
        canViewOfficerPerformance: false,
      };
  }
};

// Create the auth context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  role: null,
  permissions: getRolePermissions(null),
  login: async () => {},
  register: async () => {},
  loginWithAadhar: async () => {},
  loginAnonymously: async () => {},
  logout: () => {},
  loading: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('safecity_token');
      if (token) {
        try {
          const response = await authService.getCurrentUser();
          const userData = response.data;
          const userRole = userData.roles[0].replace('ROLE_', '').toLowerCase() as UserRole;
          
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userRole,
            badge: userData.badge,
            avatar: userData.avatar,
            aadharVerified: userData.aadharVerified,
            performanceRating: userData.performanceRating
          });
        } catch (error) {
          console.error('Session validation failed:', error);
          logout();
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      const userData = response;
      const userRole = userData.roles[0].replace('ROLE_', '').toLowerCase() as UserRole;
      
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userRole,
        badge: userData.badge,
        avatar: userData.avatar,
        aadharVerified: userData.aadharVerified,
        performanceRating: userData.performanceRating
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
        variant: "default",
      });
      
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  const loginWithAadhar = async (aadharNumber: string, otp: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await authService.loginWithAadhar(aadharNumber, otp);
      const userData = response;
      const userRole = userData.roles[0].replace('ROLE_', '').toLowerCase() as UserRole;
      
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userRole,
        badge: userData.badge,
        avatar: userData.avatar,
        aadharVerified: true,
        performanceRating: userData.performanceRating
      });
      
      toast({
        title: "Aadhar verification successful",
        description: `Welcome, ${userData.name}!`,
        variant: "default",
      });
      
    } catch (error) {
      console.error('Aadhar login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Aadhar verification failed');
    } finally {
      setLoading(false);
    }
  };
  
  const loginAnonymously = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await authService.loginAnonymously();
      const userData = response;
      
      setUser({
        id: userData.id,
        name: 'Anonymous User',
        email: '',
        role: 'user',
        avatar: undefined,
        aadharVerified: false
      });
      
      toast({
        title: "Anonymous login successful",
        description: "You are now using the app anonymously. Some features may be limited.",
        variant: "default",
      });
      
    } catch (error) {
      console.error('Anonymous login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Anonymous login failed');
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string, role: UserRole, aadharNumber?: string): Promise<void> => {
    setLoading(true);
    try {
      await authService.register(name, email, password, role, aadharNumber);
      toast({
        title: "Registration successful",
        description: "Please log in with your new account",
        variant: "default",
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const permissions = getRolePermissions(user?.role || null);

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    permissions,
    login,
    register,
    loginWithAadhar,
    loginAnonymously,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
