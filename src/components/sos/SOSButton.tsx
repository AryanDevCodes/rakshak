
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';

const SOSButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleSOSClick = () => {
    setShowConfirmation(true);
  };

  const sendSOSAlert = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, we would call an API to send the SOS alert
      // For demo purposes, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Emergency Alert Sent",
        description: "Your location has been shared with nearby authorities.",
        variant: "success",
      });
      
      console.log("SOS Alert sent with user details:", isAuthenticated ? user : "Anonymous user");
      
      // Close the confirmation dialog
      setShowConfirmation(false);
    } catch (error) {
      toast({
        title: "Failed to send alert",
        description: "Please try again or call emergency services directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          onClick={handleSOSClick}
          size="lg"
          className="rounded-full h-16 w-16 bg-red-600 hover:bg-red-700 shadow-lg"
          aria-label="Emergency SOS"
        >
          <AlertTriangle className="h-8 w-8 animate-pulse" />
        </Button>
      </div>
      
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Confirm Emergency Alert
            </DialogTitle>
            <DialogDescription>
              This will send an emergency alert to nearby authorities with your current location.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-700">
              Please confirm that you want to send an emergency SOS alert. This should only be used in genuine emergencies.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmation(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={sendSOSAlert}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Emergency Alert'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
