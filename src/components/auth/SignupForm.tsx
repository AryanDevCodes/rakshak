
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
import SignupFormFields, { SignupFormValues } from './SignupFormFields';

const SignupForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isRegistering, setIsRegistering] = useState(false);

  // Handle role tab change
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
  };

  // Handle form submission
  const onSubmit = async (values: SignupFormValues) => {
    try {
      setIsRegistering(true);
      
      // Use the registration function from auth context
      await register(values.name, values.email, values.password, selectedRole);
      
      toast({
        title: "Registration successful",
        description: `Welcome to SafeCity!`,
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
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Register a new account to use SafeCity services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleSelector 
          selectedRole={selectedRole} 
          onRoleChange={handleRoleChange} 
        />

        <SignupFormFields 
          onSubmit={onSubmit} 
          isRegistering={isRegistering} 
          selectedRole={selectedRole}
        />
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-police-700 hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
