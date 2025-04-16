
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AnonymousLoginButton = () => {
  const { loginAnonymously } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnonymousLogin = async () => {
    setIsLoading(true);
    try {
      await loginAnonymously();
    } catch (error) {
      console.error('Anonymous login failed:', error);
      toast({
        title: "Login Failed",
        description: "Failed to login anonymously. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleAnonymousLogin} 
      variant="outline" 
      className="w-full" 
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        <>
          <EyeOff className="mr-2 h-4 w-4" />
          Continue Anonymously
        </>
      )}
    </Button>
  );
};

export default AnonymousLoginButton;
