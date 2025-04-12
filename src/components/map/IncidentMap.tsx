
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Map as MapIcon } from 'lucide-react';

// Define incident types
interface Incident {
  id: string;
  type: string;
  description: string;
  lat: number;
  lng: number;
  date: string;
  status: 'active' | 'resolved';
}

// Mock data for incidents
const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'Theft',
    description: 'Bike theft reported outside the library',
    lat: 37.7749,
    lng: -122.4194,
    date: '2023-04-11T14:30:00',
    status: 'active'
  },
  {
    id: '2',
    type: 'Assault',
    description: 'Physical altercation reported',
    lat: 37.7848,
    lng: -122.4294,
    date: '2023-04-11T12:15:00',
    status: 'active'
  },
  {
    id: '3',
    type: 'Vandalism',
    description: 'Graffiti on public building',
    lat: 37.7649,
    lng: -122.4094,
    date: '2023-04-10T23:45:00',
    status: 'resolved'
  },
  {
    id: '4',
    type: 'Suspicious Activity',
    description: 'Person reported looking into car windows',
    lat: 37.7549,
    lng: -122.4294,
    date: '2023-04-11T08:20:00',
    status: 'active'
  }
];

// Custom icon for incidents
const incidentIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const IncidentMap = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const mapCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco coordinates
  const zoom = 13;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold flex items-center">
              <MapIcon className="mr-2 h-5 w-5 text-police-600" />
              Incident Map
            </CardTitle>
            <Badge variant="outline">
              {mockIncidents.filter(i => i.status === 'active').length} Active Incidents
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] w-full rounded-b-lg overflow-hidden">
            <MapContainer 
              center={[mapCenter.lat, mapCenter.lng]} 
              zoom={zoom} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mockIncidents.map((incident) => (
                <Marker
                  key={incident.id}
                  position={[incident.lat, incident.lng]}
                  icon={incidentIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedIncident(incident);
                    },
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{incident.type}</h3>
                      <p>{incident.description}</p>
                      <p className="text-xs mt-1">
                        {new Date(incident.date).toLocaleString()}
                      </p>
                      <Badge 
                        className="mt-2" 
                        variant={incident.status === 'active' ? 'destructive' : 'outline'}
                      >
                        {incident.status === 'active' ? 'Active' : 'Resolved'}
                      </Badge>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-emergency-500" />
            Incident Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedIncident ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedIncident.type}</h3>
                <Badge 
                  className="mt-1" 
                  variant={selectedIncident.status === 'active' ? 'destructive' : 'outline'}
                >
                  {selectedIncident.status === 'active' ? 'Active' : 'Resolved'}
                </Badge>
              </div>
              <p>{selectedIncident.description}</p>
              <div className="text-sm text-muted-foreground">
                <div>Date: {new Date(selectedIncident.date).toLocaleDateString()}</div>
                <div>Time: {new Date(selectedIncident.date).toLocaleTimeString()}</div>
                <div>Coordinates: {selectedIncident.lat.toFixed(4)}, {selectedIncident.lng.toFixed(4)}</div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-1">Assigned to:</h4>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-police-200 rounded-full flex items-center justify-center text-police-700 font-bold mr-2">
                    JD
                  </div>
                  <div>
                    <div className="text-sm font-medium">Officer J. Doe</div>
                    <div className="text-xs text-muted-foreground">Precinct: Central</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Select an incident on the map to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentMap;
