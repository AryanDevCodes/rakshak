
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import IncidentMap from '@/components/map/IncidentMap';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MapPage = () => {
  const { toast } = useToast();
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  const generatePDF = async () => {
    toast({
      title: "Generating PDF",
      description: "Please wait while your document is being created."
    });
    
    const projectInfoElement = document.getElementById('project-info');
    if (!projectInfoElement) return;
    
    try {
      const canvas = await html2canvas(projectInfoElement);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('SafeCity-Project-Structure.pdf');
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your document has been downloaded.",
        variant: "default" // Changed from "success" to "default" as it's a valid variant
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error Generating PDF",
        description: "There was a problem creating your document.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Crime Incident Map</h1>
          <Button 
            onClick={() => setShowProjectInfo(!showProjectInfo)}
            variant="outline"
            className="mr-2"
          >
            {showProjectInfo ? "Hide Project Info" : "Show Project Info"}
          </Button>
          {showProjectInfo && (
            <Button onClick={generatePDF} variant="secondary">
              <FileDown className="h-4 w-4 mr-2" />
              Download as PDF
            </Button>
          )}
        </div>
        
        <p className="text-muted-foreground mb-6">
          View recent incidents and reports in your area
        </p>
        
        {showProjectInfo && (
          <div id="project-info" className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-police-700">SafeCity Project Structure</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">Project Overview</h3>
            <p className="mb-3">
              The SafeCity application is an integrated crime reporting and management system with a React frontend and Spring Boot backend using MongoDB as the NoSQL database.
            </p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Project Structure</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
{`safecity-application/
├── frontend/                        # React frontend
│   └── ... (React components, pages, etc.)
│
└── backend/                         # Spring Boot backend
    ├── src/
    │   ├── main/
    │   │   ├── java/com/safecity/
    │   │   │   ├── controller/      # REST API controllers
    │   │   │   ├── model/           # MongoDB document models
    │   │   │   ├── repository/      # MongoDB repositories
    │   │   │   ├── service/         # Business logic layer
    │   │   │   ├── dto/             # Data Transfer Objects
    │   │   │   ├── security/        # Security configuration
    │   │   │   ├── config/          # Application configurations
    │   │   │   ├── exception/       # Exception handling
    │   │   │   └── util/            # Utility classes
    │   │   │
    │   │   └── resources/           # Application properties
    │   │
    │   └── test/                    # Unit and integration tests
    │
    ├── pom.xml                      # Maven dependencies
    └── Dockerfile                   # Docker configuration`}
            </pre>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">MongoDB Benefits</h3>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2"><strong>Geospatial Indexing:</strong> Efficient location-based queries for incident mapping</li>
              <li className="mb-2"><strong>Flexible Schema:</strong> Adaptable data structure for different types of incidents</li>
              <li className="mb-2"><strong>GridFS:</strong> Store and retrieve evidence files directly in the database</li>
              <li className="mb-2"><strong>Efficient Reads:</strong> Optimized for the read-heavy operations of map visualization</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Key Features</h3>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2"><strong>Interactive Crime Map:</strong> Real-time visualization of incidents</li>
              <li className="mb-2"><strong>Officer Dashboard:</strong> Case management and analytics for law enforcement</li>
              <li className="mb-2"><strong>Citizen Reporting:</strong> Easy-to-use forms for reporting incidents</li>
              <li className="mb-2"><strong>Emergency Alerts:</strong> Quick notification system for critical situations</li>
              <li className="mb-2"><strong>Data Analytics:</strong> Crime statistics and trend analysis</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Technology Stack</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-bold">Frontend:</h4>
                <ul className="list-disc pl-5">
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>React Router</li>
                  <li>Leaflet Maps</li>
                  <li>React Query</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">Backend:</h4>
                <ul className="list-disc pl-5">
                  <li>Spring Boot</li>
                  <li>Spring Data MongoDB</li>
                  <li>Spring Security</li>
                  <li>JWT Authentication</li>
                  <li>GridFS for file storage</li>
                </ul>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-8 pt-4 border-t">
              Document generated from SafeCity project documentation - {new Date().toLocaleDateString()}
            </div>
          </div>
        )}
        
        <IncidentMap />
      </div>
    </div>
  );
};

export default MapPage;
