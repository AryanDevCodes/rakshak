
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
  avatar?: string; // Add avatar property
}

// Define permissions for each role
export interface RolePermissions {
  canViewDashboard: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canApproveReports: boolean;
  canEditAlerts: boolean;
  canViewMap: boolean;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  permissions: RolePermissions;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
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
      };
    case 'officer':
      return {
        canViewDashboard: true,
        canViewReports: true,
        canManageUsers: false,
        canApproveReports: true,
        canEditAlerts: true,
        canViewMap: true,
      };
    case 'user':
      return {
        canViewDashboard: false,
        canViewReports: true,
        canManageUsers: false,
        canApproveReports: false,
        canEditAlerts: false,
        canViewMap: true,
      };
    default:
      return {
        canViewDashboard: false,
        canViewReports: false,
        canManageUsers: false,
        canApproveReports: false,
        canEditAlerts: false,
        canViewMap: false,
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
            avatar: userData.avatar // Add avatar from user data
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
        avatar: userData.avatar // Add avatar from login response
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
  
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    try {
      await authService.register(name, email, password, role);
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
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
