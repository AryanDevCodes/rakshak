
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, MapPin, Camera, Paperclip } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const incidentTypes = [
  { value: 'theft', label: 'Theft' },
  { value: 'assault', label: 'Assault' },
  { value: 'vandalism', label: 'Vandalism' },
  { value: 'suspicious', label: 'Suspicious Activity' },
  { value: 'noise', label: 'Noise Complaint' },
  { value: 'traffic', label: 'Traffic Incident' },
  { value: 'other', label: 'Other' }
];

const ReportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hasEvidence, setHasEvidence] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted",
        description: "Thank you for your report. An officer will review it shortly.",
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <FileText className="mr-2 h-6 w-6 text-police-600" />
          Report an Incident
        </CardTitle>
        <CardDescription>
          Provide details about the incident you'd like to report. All information will be kept confidential.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="incidentType">Type of Incident</Label>
              <Select>
                <SelectTrigger id="incidentType">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date & Time of Incident</Label>
              <Input id="date" type="datetime-local" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Input id="location" placeholder="Enter address or location" />
              <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Or click to add location on map
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Please provide as much detail as possible about what happened" 
              className="min-h-[120px]"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your name" 
                disabled={isAnonymous}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information</Label>
              <Input 
                id="contact" 
                placeholder="Phone number or email" 
                disabled={isAnonymous}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="anonymous" 
              checked={isAnonymous} 
              onCheckedChange={setIsAnonymous}
            />
            <Label htmlFor="anonymous">Report Anonymously</Label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="evidence" 
                checked={hasEvidence} 
                onCheckedChange={setHasEvidence}
              />
              <Label htmlFor="evidence">I have evidence to share</Label>
            </div>

            {hasEvidence && (
              <div className="mt-4 space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium mb-1">Upload photos or videos</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Drag and drop files or click to browse
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border p-4 rounded-md bg-muted/30 text-sm">
            <p className="font-medium mb-2">Important Note:</p>
            <p>Filing a false police report is a crime. By submitting this form, you affirm that the information provided is truthful to the best of your knowledge.</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className="bg-police-700 hover:bg-police-800"
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportForm;
