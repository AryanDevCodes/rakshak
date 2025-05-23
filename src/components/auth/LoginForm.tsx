
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole, useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import RoleSelector from './RoleSelector';
import LoginFormFields, { LoginFormValues } from './LoginFormFields';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [formRef, setFormRef] = useState<any>(null);

  // Handle role tab change
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
  };

  // Handle form submission
  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoggingIn(true);
      await login(values.email, values.password, selectedRole);
      
      toast({
        title: "Login successful",
        description: `Welcome back!`,
        variant: "default",
      });
      
      // Redirect based on role
      if (selectedRole === 'admin') {
        navigate('/dashboard');
      } else if (selectedRole === 'officer') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Select your role to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleSelector 
          selectedRole={selectedRole} 
          onRoleChange={handleRoleChange} 
        />

        <LoginFormFields 
          onSubmit={onSubmit} 
          isLoggingIn={isLoggingIn} 
          selectedRole={selectedRole}
          setFormRef={setFormRef}
        />
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-police-700 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
