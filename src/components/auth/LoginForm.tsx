
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Type for form values
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

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

  // Handle role tab change
  const handleRoleChange = (value: string) => {
    setSelectedRole(value as UserRole);
    
    // Pre-fill demo credentials based on role
    let email = '';
    
    switch(value) {
      case 'officer':
        email = 'officer@police.gov';
        break;
      case 'admin':
        email = 'admin@safecity.org';
        break;
      case 'user':
      default:
        email = 'john@example.com';
    }
    
    form.setValue('email', email);
    form.setValue('password', 'password123');
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
              Login as a citizen to report incidents and view crime data.
            </div>
          </TabsContent>
          <TabsContent value="officer">
            <div className="p-4 bg-blue-50 rounded-md mb-4 text-sm">
              Login as a police officer to manage incidents and respond to reports.
            </div>
          </TabsContent>
          <TabsContent value="admin">
            <div className="p-4 bg-blue-50 rounded-md mb-4 text-sm">
              Login as an administrator to manage the system and access all features.
            </div>
          </TabsContent>
        </Tabs>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-police-700 hover:bg-police-800" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 border-t pt-4">
        <div className="text-sm text-muted-foreground text-center">
          <span className="block">Demo login information is pre-filled.</span>
          <span>Use password: <strong>password123</strong></span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
