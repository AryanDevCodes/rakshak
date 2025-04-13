
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/contexts/AuthContext';

// Form schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Type for form values
export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormFieldsProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  isLoggingIn: boolean;
  selectedRole: UserRole;
  setFormRef?: (form: any) => void;
}

const LoginFormFields = ({ onSubmit, isLoggingIn, selectedRole, setFormRef }: LoginFormFieldsProps) => {
  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Set form reference if needed for parent component
  React.useEffect(() => {
    if (setFormRef) {
      setFormRef(form);
    }
  }, [form, setFormRef]);

  // Pre-fill demo credentials based on role
  React.useEffect(() => {
    let email = '';
    
    switch(selectedRole) {
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
  }, [selectedRole, form]);

  return (
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
  );
};

export default LoginFormFields;
