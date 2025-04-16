
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, MapPin, Camera, Paperclip, Mic } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { reportService } from '@/services/api';
import VoiceReportingButton from './VoiceReportingButton';
import { useAuth } from '@/contexts/AuthContext';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const incidentTypes = [
  { value: 'theft', label: 'Theft' },
  { value: 'assault', label: 'Assault' },
  { value: 'vandalism', label: 'Vandalism' },
  { value: 'suspicious', label: 'Suspicious Activity' },
  { value: 'noise', label: 'Noise Complaint' },
  { value: 'traffic', label: 'Traffic Incident' },
  { value: 'other', label: 'Other' }
];

const LocationPicker = ({ onLocationSelected }: { onLocationSelected: (lat: number, lng: number) => void }) => {
  const [marker, setMarker] = useState<[number, number] | null>(null);
  
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        onLocationSelected(lat, lng);
      },
    });
    return null;
  };

  return (
    <div className="h-64 w-full mb-4 border rounded-md overflow-hidden">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {marker && <Marker position={marker} />}
        <MapEvents />
      </MapContainer>
    </div>
  );
};

const ReportForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hasEvidence, setHasEvidence] = useState(false);
  const [reportType, setReportType] = useState<'text' | 'voice'>('text');
  const [location, setLocation] = useState<{ lat?: number, lng?: number, address?: string }>({});
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [formData, setFormData] = useState({
    incidentType: '',
    date: '',
    description: '',
    name: user?.name || '',
    contact: user?.email || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setLocation({ lat, lng });
    // Attempt to get address from coordinates
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
      .then(res => res.json())
      .then(data => {
        if (data.display_name) {
          setLocation(prev => ({ ...prev, address: data.display_name }));
        }
      })
      .catch(err => console.error('Failed to fetch address:', err));
  };

  const handleLocationTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(prev => ({ ...prev, address: e.target.value }));
  };

  const handleVoiceRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    toast({
      title: "Voice Recording Complete",
      description: "Your voice recording has been saved. Please submit your report.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reportData = {
        incidentType: formData.incidentType,
        date: formData.date,
        description: formData.description,
        location: location.address,
        coordinates: location.lat && location.lng ? { lat: location.lat, lng: location.lng } : undefined,
        anonymous: isAnonymous,
        reporter: isAnonymous ? null : {
          name: formData.name,
          contact: formData.contact
        }
      };

      if (reportType === 'voice' && audioBlob) {
        await reportService.createVoiceReport(audioBlob, reportData);
      } else {
        await reportService.createReport(reportData);
      }

      toast({
        title: "Report Submitted",
        description: "Thank you for your report. An officer will review it shortly.",
      });

      // Reset form
      setFormData({
        incidentType: '',
        date: '',
        description: '',
        name: user?.name || '',
        contact: user?.email || ''
      });
      setLocation({});
      setAudioBlob(null);
      setHasEvidence(false);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <Tabs defaultValue="text" onValueChange={(value) => setReportType(value as 'text' | 'voice')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="text">Written Report</TabsTrigger>
            <TabsTrigger value="voice">
              <Mic className="mr-2 h-4 w-4" />
              Voice Report
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="incidentType">Type of Incident</Label>
                  <Select 
                    value={formData.incidentType} 
                    onValueChange={(value) => handleSelectChange('incidentType', value)}
                  >
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
                  <Input 
                    id="date" 
                    type="datetime-local" 
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Input 
                    id="location" 
                    placeholder="Enter address or location" 
                    value={location.address || ''}
                    onChange={handleLocationTextChange}
                  />
                  <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Or click to add location on map
                </p>
                <LocationPicker onLocationSelected={handleLocationChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Please provide as much detail as possible about what happened" 
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    disabled={isAnonymous}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information</Label>
                  <Input 
                    id="contact" 
                    placeholder="Phone number or email" 
                    disabled={isAnonymous}
                    value={formData.contact}
                    onChange={handleChange}
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
              
              <div className="flex justify-between">
                <Button variant="outline" type="button">Cancel</Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-police-700 hover:bg-police-800"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="voice">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Record Your Report</h3>
                <p className="text-muted-foreground">
                  Speak clearly into your microphone to report the incident. Mention the type of incident, 
                  location, date and time, and provide a detailed description.
                </p>
                
                <div className="border p-4 rounded-md">
                  {audioBlob ? (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <audio controls src={URL.createObjectURL(audioBlob)} className="w-full" />
                      </div>
                      <Button 
                        onClick={() => setAudioBlob(null)} 
                        variant="outline" 
                        className="w-full"
                      >
                        Record Again
                      </Button>
                    </div>
                  ) : (
                    <VoiceReportingButton onRecordingComplete={handleVoiceRecordingComplete} />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location-voice">Location</Label>
                <div className="relative">
                  <Input 
                    id="location-voice" 
                    placeholder="Enter address or location" 
                    value={location.address || ''}
                    onChange={handleLocationTextChange}
                  />
                  <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Click to add location on map
                </p>
                <LocationPicker onLocationSelected={handleLocationChange} />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="anonymous-voice" 
                  checked={isAnonymous} 
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous-voice">Report Anonymously</Label>
              </div>
              
              <div className="border p-4 rounded-md bg-muted/30 text-sm">
                <p className="font-medium mb-2">Important Note:</p>
                <p>Filing a false police report is a crime. By submitting this recording, you affirm that the information provided is truthful to the best of your knowledge.</p>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" type="button">Cancel</Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || !audioBlob} 
                  className="bg-police-700 hover:bg-police-800"
                >
                  {isSubmitting ? "Submitting..." : "Submit Voice Report"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        All reports are processed securely and confidentially
      </CardFooter>
    </Card>
  );
};

export default ReportForm;
