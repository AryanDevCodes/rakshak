
import React, { useState } from 'react';
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
import { Loader2, Fingerprint, Key } from 'lucide-react';
import { authService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';

// Form schema for validation
const aadharSchema = z.object({
  aadharNumber: z.string().length(12, { message: 'Aadhar number must be 12 digits' }).regex(/^\d+$/, { message: 'Aadhar number must contain only digits' }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }).regex(/^\d+$/, { message: 'OTP must contain only digits' }),
});

const AadharLoginForm = () => {
  const { loginWithAadhar } = useAuth();
  const [step, setStep] = useState<'aadhar' | 'otp'>('aadhar');
  const [isLoading, setIsLoading] = useState(false);
  const [aadharNumber, setAadharNumber] = useState('');
  const { toast } = useToast();

  const aadharForm = useForm<z.infer<typeof aadharSchema>>({
    resolver: zodResolver(aadharSchema),
    defaultValues: {
      aadharNumber: '',
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const handleAadharSubmit = async (values: z.infer<typeof aadharSchema>) => {
    setIsLoading(true);
    try {
      await authService.requestOtp(values.aadharNumber);
      setAadharNumber(values.aadharNumber);
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your registered mobile number.",
      });
    } catch (error) {
      console.error('Failed to request OTP:', error);
      toast({
        title: "Verification Failed",
        description: "Could not send OTP. Please check your Aadhar number and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    setIsLoading(true);
    try {
      await loginWithAadhar(aadharNumber, values.otp);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      toast({
        title: "Authentication Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Fingerprint className="mr-2 h-6 w-6 text-police-600" />
          Aadhar Authentication
        </CardTitle>
        <CardDescription>
          Securely authenticate using your Aadhar number
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'aadhar' ? (
          <Form {...aadharForm}>
            <form onSubmit={aadharForm.handleSubmit(handleAadharSubmit)} className="space-y-4">
              <FormField
                control={aadharForm.control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 12-digit Aadhar number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-police-700 hover:bg-police-800" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Fingerprint className="mr-2 h-4 w-4" />
                    Verify Aadhar
                  </>
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 6-digit OTP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-police-700 hover:bg-police-800" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    Verify OTP
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => setStep('aadhar')}
                disabled={isLoading}
              >
                Back to Aadhar entry
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Government of India approved authentication method
      </CardFooter>
    </Card>
  );
};

export default AadharLoginForm;
