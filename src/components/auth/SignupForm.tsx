
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole, useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Shield, User, UserCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Form schema for validation
const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type for form values
type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isRegistering, setIsRegistering] = useState(false);

  // Initialize form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

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

  // Handle role tab change
  const handleRoleChange = (value: string) => {
    setSelectedRole(value as UserRole);
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
        <Tabs defaultValue="user" onValueChange={handleRoleChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="user" className="flex items-center justify-center gap-2">
              <User className="h-4 w-4" />
              <span>Citizen</span>
            </TabsTrigger>
            <TabsTrigger value="officer" className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Officer</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center justify-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user">
            <div className="p-4 bg-blue-50 rounded-md mb-4 text-sm">
              Register as a citizen to report incidents and access safety features.
            </div>
          </TabsContent>
          <TabsContent value="officer">
            <div className="p-4 bg-blue-50 rounded-md mb-4 text-sm">
              Officer accounts require verification before full access is granted.
            </div>
          </TabsContent>
          <TabsContent value="admin">
            <div className="p-4 bg-blue-50 rounded-md mb-4 text-sm">
              Admin registration is restricted and requires special authorization.
            </div>
          </TabsContent>
        </Tabs>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-police-700 hover:bg-police-800" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
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
