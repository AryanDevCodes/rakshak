
import React, { useState } from 'react';
import { AlertOctagon, Phone } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const EmergencySOS = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleEmergency = () => {
    setIsDialogOpen(true);
  };

  const sendEmergencySignal = () => {
    setIsSending(true);
    
    // Simulate sending emergency signal
    setTimeout(() => {
      setIsSending(false);
      setIsDialogOpen(false);
      toast({
        title: "Emergency Signal Sent",
        description: "Help is on the way. Stay safe. An officer will contact you shortly.",
        variant: "destructive",
      });
    }, 2000);
  };

  return (
    <>
      <div className="relative">
        <Button 
          onClick={handleEmergency} 
          className="emergency-button animate-pulse-urgent w-full"
          size="lg"
        >
          <AlertOctagon className="mr-2 h-5 w-5" />
          Emergency SOS
        </Button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="border-2 border-emergency-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-emergency-600 flex items-center">
              <AlertOctagon className="mr-2 h-5 w-5" />
              Emergency Assistance
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will send your current location to nearby police officers and emergency services.
              <div className="mt-4 p-3 bg-emergency-50 rounded-md border border-emergency-100">
                <div className="flex items-center text-sm font-medium text-emergency-800">
                  <Phone className="mr-2 h-4 w-4" />
                  If this is a life-threatening emergency, please also call 911
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSending}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={sendEmergencySignal}
              disabled={isSending} 
              className="bg-emergency-600 hover:bg-emergency-700 focus:ring-emergency-500"
            >
              {isSending ? "Sending signal..." : "Send Emergency Signal"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmergencySOS;
