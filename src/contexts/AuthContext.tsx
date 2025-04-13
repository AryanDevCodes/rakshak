
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user roles
export type UserRole = 'user' | 'officer' | 'admin' | null;

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  role: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: true,
});

// Sample user data for demo purposes
const DEMO_USERS = {
  user: {
    id: 'user-123',
    name: 'John Citizen',
    email: 'john@example.com',
    role: 'user' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  officer: {
    id: 'officer-456',
    name: 'Officer Smith',
    email: 'officer@police.gov',
    role: 'officer' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  admin: {
    id: 'admin-789',
    name: 'Admin Johnson',
    email: 'admin@safecity.org',
    role: 'admin' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('safecity_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function for demo
  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation for demo purposes
    if (!email || !password || !role) {
      throw new Error('Please provide all required fields');
    }
    
    // Demo authentication logic
    const demoUser = DEMO_USERS[role as keyof typeof DEMO_USERS];
    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem('safecity_user', JSON.stringify(demoUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };
  
  // Mock register function for demo
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple validation for demo purposes
    if (!name || !email || !password || !role) {
      throw new Error('Please provide all required fields');
    }
    
    // Create a new demo user
    const newUserId = `${role}-${Date.now()}`;
    const avatars = {
      user: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      officer: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      admin: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };
    
    const newUser: User = {
      id: newUserId,
      name,
      email,
      role: role,
      avatar: avatars[role as keyof typeof avatars],
    };
    
    // Save the new user
    setUser(newUser);
    localStorage.setItem('safecity_user', JSON.stringify(newUser));
    
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('safecity_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
