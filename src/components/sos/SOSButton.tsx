
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { AlertOctagon, Phone, Loader2, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { sosService } from '@/services/api';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

const SOSButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const handleOpenDialog = () => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsDialogOpen(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Could not get your current location. Please enable location services.",
            variant: "destructive",
          });
          // Open dialog anyway
          setIsDialogOpen(true);
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
      // Open dialog anyway
      setIsDialogOpen(true);
    }
  };

  const sendEmergencySignal = async () => {
    setIsSending(true);
    
    try {
      await sosService.triggerSOS(
        location || { lat: 0, lng: 0 }, // Fallback if location not available
        details
      );
      
      toast({
        title: "Emergency Signal Sent",
        description: "Help is on the way. Stay safe. An officer will contact you shortly.",
        variant: "destructive",
      });
      
      setIsDialogOpen(false);
      setDetails('');
    } catch (error) {
      console.error('Failed to send SOS:', error);
      toast({
        title: "SOS Sending Failed",
        description: "Could not send your emergency signal. Please try again or call emergency services directly.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const userConsentRequired = !isAuthenticated;

  return (
    <>
      <Button 
        onClick={handleOpenDialog} 
        className="emergency-button animate-pulse-urgent w-full bg-emergency-600 hover:bg-emergency-700 text-white"
        size="lg"
      >
        <AlertOctagon className="mr-2 h-5 w-5" />
        Emergency SOS
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="border-2 border-emergency-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-emergency-600 flex items-center">
              <AlertOctagon className="mr-2 h-5 w-5" />
              Emergency Assistance
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will send your current location to nearby police officers and emergency services.
              
              {location && (
                <div className="mt-3 flex items-center text-sm font-medium">
                  <MapPin className="mr-1 h-4 w-4" />
                  Your location has been detected
                </div>
              )}
              
              <div className="mt-4">
                <Textarea 
                  placeholder="Briefly describe your emergency situation (optional)"
                  className="h-20"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              
              {userConsentRequired && (
                <div className="mt-4 p-3 bg-emergency-50 rounded-md border border-emergency-200">
                  <p className="text-sm text-emergency-800">
                    You are not logged in. By sending this SOS, you consent to sharing your location and emergency details with law enforcement.
                  </p>
                </div>
              )}
              
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
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending signal...
                </>
              ) : (
                "Send Emergency Signal"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SOSButton;
