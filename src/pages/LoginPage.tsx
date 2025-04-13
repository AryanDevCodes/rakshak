
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import LoginForm from '@/components/auth/LoginForm';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-8 text-center">
          <LogIn className="h-12 w-12 mx-auto text-police-700 mb-4" />
          <h1 className="text-2xl font-bold mb-2">SafeCity Authentication</h1>
          <p className="text-muted-foreground">
            Sign in to access various features based on your role
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
