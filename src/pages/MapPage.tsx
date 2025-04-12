
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import IncidentMap from '@/components/map/IncidentMap';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MapPage = () => {
  const { toast } = useToast();
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  const generateMarkdown = () => {
    toast({
      title: "Generating Markdown",
      description: "Creating your SafeCity project documentation."
    });
    
    const markdownContent = `# SafeCity Project Structure

## Project Overview
The SafeCity application is an integrated crime reporting and management system with a React frontend and Spring Boot backend using MongoDB as the NoSQL database.

## Project Structure
\`\`\`
safecity-application/
├── frontend/                        # React frontend (current code)
│   └── ... (existing React files)
│
└── backend/                         # Spring Boot backend
    ├── src/
    │   ├── main/
    │   │   ├── java/com/safecity/
    │   │   │   ├── SafeCityApplication.java     # Main application class
    │   │   │   │
    │   │   │   ├── controller/                  # REST API controllers
    │   │   │   │   ├── AuthController.java      # Authentication endpoints
    │   │   │   │   ├── IncidentController.java  # Incident management
    │   │   │   │   ├── ReportController.java    # Report submission/management
    │   │   │   │   ├── UserController.java      # User profile management
    │   │   │   │   ├── EmergencyController.java # Emergency alerts
    │   │   │   │   ├── StatisticsController.java # Crime statistics 
    │   │   │   │   └── LocationController.java  # Geolocation data
    │   │   │   │
    │   │   │   ├── model/                       # MongoDB document models
    │   │   │   │   ├── User.java                # User document
    │   │   │   │   ├── Incident.java            # Incident document
    │   │   │   │   ├── Report.java              # Report document
    │   │   │   │   ├── Emergency.java           # Emergency alert document
    │   │   │   │   ├── Location.java            # GeoJSON location document
    │   │   │   │   ├── Evidence.java            # Evidence document (photos, files)
    │   │   │   │   └── audit/                   # Auditing models
    │   │   │   │       └── AuditableDocument.java # Base class with audit fields
    │   │   │   │
    │   │   │   ├── repository/                  # MongoDB repositories
    │   │   │   │   ├── UserRepository.java
    │   │   │   │   ├── IncidentRepository.java
    │   │   │   │   ├── ReportRepository.java
    │   │   │   │   ├── EmergencyRepository.java
    │   │   │   │   └── LocationRepository.java
    │   │   │   │
    │   │   │   ├── service/                     # Business logic layer
    │   │   │   │   ├── AuthService.java         # Authentication service
    │   │   │   │   ├── IncidentService.java     # Incident management
    │   │   │   │   ├── ReportService.java       # Report processing
    │   │   │   │   ├── UserService.java         # User management
    │   │   │   │   ├── EmergencyService.java    # Emergency handling
    │   │   │   │   ├── StatisticsService.java   # Analytics services
    │   │   │   │   ├── NotificationService.java # Notification sending
    │   │   │   │   └── FileStorageService.java  # Evidence file handling
    │   │   │   │
    │   │   │   ├── dto/                         # Data Transfer Objects
    │   │   │   │   ├── request/                 # Request DTOs
    │   │   │   │   │   ├── AuthRequest.java     # Login/registration requests
    │   │   │   │   │   ├── IncidentRequest.java # Incident creation requests
    │   │   │   │   │   └── ReportRequest.java   # Report submission requests
    │   │   │   │   │
    │   │   │   │   └── response/                # Response DTOs
    │   │   │   │       ├── AuthResponse.java    # Auth tokens responses
    │   │   │   │       ├── IncidentResponse.java # Incident data responses
    │   │   │   │       ├── ErrorResponse.java   # Standard error responses
    │   │   │   │       └── StatsResponse.java   # Statistics responses
    │   │   │   │
    │   │   │   ├── security/                    # Security configuration
    │   │   │   │   ├── JwtTokenProvider.java    # JWT generation/validation
    │   │   │   │   ├── UserDetailsServiceImpl.java # Custom user details
    │   │   │   │   ├── SecurityConfig.java      # Security configuration
    │   │   │   │   └── JwtAuthenticationFilter.java # JWT filter
    │   │   │   │
    │   │   │   ├── config/                      # Application configurations
    │   │   │   │   ├── MongoConfig.java         # MongoDB configuration
    │   │   │   │   ├── WebMvcConfig.java        # CORS configuration
    │   │   │   │   ├── SwaggerConfig.java       # API documentation
    │   │   │   │   └── AsyncConfig.java         # Async task configuration
    │   │   │   │
    │   │   │   ├── exception/                   # Exception handling
    │   │   │   │   ├── GlobalExceptionHandler.java # Central exception handler
    │   │   │   │   ├── ResourceNotFoundException.java
    │   │   │   │   ├── UnauthorizedException.java
    │   │   │   │   └── BadRequestException.java
    │   │   │   │
    │   │   │   └── util/                        # Utility classes
    │   │   │       ├── GeoJsonUtil.java         # GeoJSON helpers
    │   │   │       └── DateTimeUtil.java        # Date/time utilities
    │   │   │
    │   │   └── resources/
    │   │       ├── application.yml              # Main configuration
    │   │       ├── application-dev.yml          # Dev environment config
    │   │       ├── application-prod.yml         # Production config
    │   │       └── logback-spring.xml           # Logging configuration
    │   │
    │   └── test/                                # Unit and integration tests
    │       └── java/com/safecity/
    │           ├── controller/                  # Controller tests
    │           ├── service/                     # Service tests
    │           └── repository/                  # Repository tests
    │
    ├── pom.xml                                  # Maven dependencies
    └── Dockerfile                               # Docker configuration
\`\`\`

## MongoDB Document Models

### User Document:
\`\`\`java
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password; // Hashed password
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Set<String> roles; // ROLE_USER, ROLE_OFFICER, ROLE_ADMIN
    private String badgeNumber; // For officers
    private String precinct; // For officers
    private Date createdAt;
    private Date updatedAt;
    private boolean enabled;
    // getters and setters
}
\`\`\`

### Incident Document:
\`\`\`java
@Document(collection = "incidents")
public class Incident {
    @Id
    private String id;
    private String type; // Theft, Assault, etc.
    private String description;
    private GeoJsonPoint location; // MongoDB GeoJSON Point type
    private String status; // Active, Investigating, Resolved
    private String reportedBy; // User ID
    private String assignedTo; // Officer ID
    private List<String> evidenceIds; // References to Evidence documents
    private Date incidentDate; // When the incident occurred
    private Date reportedDate; // When it was reported
    private Date resolvedDate; // When it was resolved
    private Boolean isEmergency;
    private Integer severity; // 1-5 scale
    // getters and setters
}
\`\`\`

### GeoJSON Location:
\`\`\`java
public class GeoJsonPoint {
    private String type = "Point";
    private List<Double> coordinates; // [longitude, latitude]
    // getters and setters
}
\`\`\`

## MongoDB Configuration
\`\`\`yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/safecity
      auto-index-creation: true

  # For file uploads
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

# JWT Configuration
jwt:
  secret: your-secret-key-here
  expiration: 86400000 # 24 hours in milliseconds
\`\`\`

## MongoDB Repository Example
\`\`\`java
public interface IncidentRepository extends MongoRepository<Incident, String> {
    // Find incidents within a certain radius (in meters) from a point
    List<Incident> findByLocationNear(Point location, Distance distance);
    
    // Find by type and status
    List<Incident> findByTypeAndStatus(String type, String status);
    
    // Find incidents reported by a user
    List<Incident> findByReportedBy(String userId);
    
    // Find incidents assigned to an officer
    List<Incident> findByAssignedTo(String officerId);
    
    // Count active incidents by type
    @Query("{'status': 'active', 'type': ?0}")
    Long countActiveIncidentsByType(String type);
}
\`\`\`

## MongoDB Benefits for SafeCity
- **Geospatial Indexing**: Store incident locations as GeoJSON points, query incidents by proximity to user's location, create heat maps using efficient geospatial aggregation
- **Flexible Schema**: Different incident types can have different attributes, easy addition of new fields without schema migrations, better handling of nested objects
- **GridFS for Evidence Storage**: Store large files like photos and videos within MongoDB, link them directly to incident reports, stream files efficiently to frontend
- **Efficient Read Operations**: Embedded documents reduce join operations, denormalized data improves read performance

## Frontend Integration
\`\`\`typescript
// src/services/incidentService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchIncidents = async (lat, lng, radius = 5000) => {
  const response = await axios.get(\`\${API_URL}/incidents/nearby\`, {
    params: { lat, lng, radius },
    headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
  });
  return response.data;
};

export const reportIncident = async (incidentData) => {
  const response = await axios.post(\`\${API_URL}/incidents\`, incidentData, {
    headers: { 
      Authorization: \`Bearer \${localStorage.getItem('token')}\`,
      'Content-Type': 'multipart/form-data' // For file uploads
    }
  });
  return response.data;
};
\`\`\`

## Deployment Architecture
**Containerized Deployment:**
\`\`\`
docker-compose.yml
    - frontend (React container)
    - backend (Spring Boot container)
    - mongodb (MongoDB container)
    - mongo-express (Optional admin UI)
\`\`\`

**Production Deployment:**
- Kubernetes cluster with separate pods for frontend, backend, MongoDB
- MongoDB Atlas for managed database service
- Cloud storage integration for evidence files (optional)

*Document generated from SafeCity project documentation - ${new Date().toLocaleDateString()}*
`;

    // Create a blob from the markdown content
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SafeCity-Project-Structure.md';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Markdown Generated Successfully",
      description: "Your documentation has been downloaded as a .md file.",
      variant: "default"
    });
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
            <Button onClick={generateMarkdown} variant="secondary">
              <FileDown className="h-4 w-4 mr-2" />
              Download as Markdown
            </Button>
          )}
        </div>
        
        <p className="text-muted-foreground mb-6">
          View recent incidents and reports in your area
        </p>
        
        {showProjectInfo && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-police-700">SafeCity Project Structure</h2>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Project Overview</h3>
            <p className="mb-3">
              The SafeCity application is an integrated crime reporting and management system with a React frontend and Spring Boot backend using MongoDB as the NoSQL database.
            </p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Project Structure</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
{`safecity-application/
├── frontend/                        # React frontend (current code)
│   └── ... (existing React files)
│
└── backend/                         # Spring Boot backend
    ├── src/
    │   ├── main/
    │   │   ├── java/com/safecity/
    │   │   │   ├── SafeCityApplication.java     # Main application class
    │   │   │   │
    │   │   │   ├── controller/                  # REST API controllers
    │   │   │   │   ├── AuthController.java      # Authentication endpoints
    │   │   │   │   ├── IncidentController.java  # Incident management
    │   │   │   │   ├── ReportController.java    # Report submission/management
    │   │   │   │   ├── UserController.java      # User profile management
    │   │   │   │   ├── EmergencyController.java # Emergency alerts
    │   │   │   │   ├── StatisticsController.java # Crime statistics 
    │   │   │   │   └── LocationController.java  # Geolocation data
    │   │   │   │
    │   │   │   ├── model/                       # MongoDB document models
    │   │   │   │   ├── User.java                # User document
    │   │   │   │   ├── Incident.java            # Incident document
    │   │   │   │   ├── Report.java              # Report document
    │   │   │   │   ├── Emergency.java           # Emergency alert document
    │   │   │   │   ├── Location.java            # GeoJSON location document
    │   │   │   │   ├── Evidence.java            # Evidence document (photos, files)
    │   │   │   │   └── audit/                   # Auditing models
    │   │   │   │       └── AuditableDocument.java # Base class with audit fields
    │   │   │   │
    │   │   │   ├── repository/                  # MongoDB repositories
    │   │   │   │   ├── UserRepository.java
    │   │   │   │   ├── IncidentRepository.java
    │   │   │   │   ├── ReportRepository.java
    │   │   │   │   ├── EmergencyRepository.java
    │   │   │   │   └── LocationRepository.java
    │   │   │   │
    │   │   │   ├── service/                     # Business logic layer
    │   │   │   │   ├── AuthService.java         # Authentication service
    │   │   │   │   ├── IncidentService.java     # Incident management
    │   │   │   │   ├── ReportService.java       # Report processing
    │   │   │   │   ├── UserService.java         # User management
    │   │   │   │   ├── EmergencyService.java    # Emergency handling
    │   │   │   │   ├── StatisticsService.java   # Analytics services
    │   │   │   │   ├── NotificationService.java # Notification sending
    │   │   │   │   └── FileStorageService.java  # Evidence file handling
    │   │   │   │
    │   │   │   ├── dto/                         # Data Transfer Objects
    │   │   │   │   ├── request/                 # Request DTOs
    │   │   │   │   │   ├── AuthRequest.java     # Login/registration requests
    │   │   │   │   │   ├── IncidentRequest.java # Incident creation requests
    │   │   │   │   │   └── ReportRequest.java   # Report submission requests
    │   │   │   │   │
    │   │   │   │   └── response/                # Response DTOs
    │   │   │   │       ├── AuthResponse.java    # Auth tokens responses
    │   │   │   │       ├── IncidentResponse.java # Incident data responses
    │   │   │   │       ├── ErrorResponse.java   # Standard error responses
    │   │   │   │       └── StatsResponse.java   # Statistics responses
    │   │   │   │
    │   │   │   ├── security/                    # Security configuration
    │   │   │   │   ├── JwtTokenProvider.java    # JWT generation/validation
    │   │   │   │   ├── UserDetailsServiceImpl.java # Custom user details
    │   │   │   │   ├── SecurityConfig.java      # Security configuration
    │   │   │   │   └── JwtAuthenticationFilter.java # JWT filter
    │   │   │   │
    │   │   │   ├── config/                      # Application configurations
    │   │   │   │   ├── MongoConfig.java         # MongoDB configuration
    │   │   │   │   ├── WebMvcConfig.java        # CORS configuration
    │   │   │   │   ├── SwaggerConfig.java       # API documentation
    │   │   │   │   └── AsyncConfig.java         # Async task configuration
    │   │   │   │
    │   │   │   ├── exception/                   # Exception handling
    │   │   │   │   ├── GlobalExceptionHandler.java # Central exception handler
    │   │   │   │   ├── ResourceNotFoundException.java
    │   │   │   │   ├── UnauthorizedException.java
    │   │   │   │   └── BadRequestException.java
    │   │   │   │
    │   │   │   └── util/                        # Utility classes
    │   │   │       ├── GeoJsonUtil.java         # GeoJSON helpers
    │   │   │       └── DateTimeUtil.java        # Date/time utilities
    │   │   │
    │   │   └── resources/
    │   │       ├── application.yml              # Main configuration
    │   │       ├── application-dev.yml          # Dev environment config
    │   │       ├── application-prod.yml         # Production config
    │   │       └── logback-spring.xml           # Logging configuration
    │   │
    │   └── test/                                # Unit and integration tests
    │       └── java/com/safecity/
    │           ├── controller/                  # Controller tests
    │           ├── service/                     # Service tests
    │           └── repository/                  # Repository tests
    │
    ├── pom.xml                                  # Maven dependencies
    └── Dockerfile                               # Docker configuration`}
            </pre>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">MongoDB Document Models</h3>
            <div className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
              <p className="font-semibold">User Document:</p>
              <pre className="mt-2">
{`@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password; // Hashed password
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Set<String> roles; // ROLE_USER, ROLE_OFFICER, ROLE_ADMIN
    private String badgeNumber; // For officers
    private String precinct; // For officers
    private Date createdAt;
    private Date updatedAt;
    private boolean enabled;
    // getters and setters
}`}
              </pre>
              
              <p className="font-semibold mt-4">Incident Document:</p>
              <pre className="mt-2">
{`@Document(collection = "incidents")
public class Incident {
    @Id
    private String id;
    private String type; // Theft, Assault, etc.
    private String description;
    private GeoJsonPoint location; // MongoDB GeoJSON Point type
    private String status; // Active, Investigating, Resolved
    private String reportedBy; // User ID
    private String assignedTo; // Officer ID
    private List<String> evidenceIds; // References to Evidence documents
    private Date incidentDate; // When the incident occurred
    private Date reportedDate; // When it was reported
    private Date resolvedDate; // When it was resolved
    private Boolean isEmergency;
    private Integer severity; // 1-5 scale
    // getters and setters
}`}
              </pre>
              
              <p className="font-semibold mt-4">GeoJSON Location:</p>
              <pre className="mt-2">
{`public class GeoJsonPoint {
    private String type = "Point";
    private List<Double> coordinates; // [longitude, latitude]
    // getters and setters
}`}
              </pre>
            </div>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">MongoDB Configuration</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
{`spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/safecity
      auto-index-creation: true

  # For file uploads
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

# JWT Configuration
jwt:
  secret: your-secret-key-here
  expiration: 86400000 # 24 hours in milliseconds`}
            </pre>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">MongoDB Repository Example</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
{`public interface IncidentRepository extends MongoRepository<Incident, String> {
    // Find incidents within a certain radius (in meters) from a point
    List<Incident> findByLocationNear(Point location, Distance distance);
    
    // Find by type and status
    List<Incident> findByTypeAndStatus(String type, String status);
    
    // Find incidents reported by a user
    List<Incident> findByReportedBy(String userId);
    
    // Find incidents assigned to an officer
    List<Incident> findByAssignedTo(String officerId);
    
    // Count active incidents by type
    @Query("{'status': 'active', 'type': ?0}")
    Long countActiveIncidentsByType(String type);
}`}
            </pre>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">MongoDB Benefits for SafeCity</h3>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">
                <strong>Geospatial Indexing:</strong> Store incident locations as GeoJSON points, query incidents by proximity to user's location, create heat maps using efficient geospatial aggregation
              </li>
              <li className="mb-2">
                <strong>Flexible Schema:</strong> Different incident types can have different attributes, easy addition of new fields without schema migrations, better handling of nested objects
              </li>
              <li className="mb-2">
                <strong>GridFS for Evidence Storage:</strong> Store large files like photos and videos within MongoDB, link them directly to incident reports, stream files efficiently to frontend
              </li>
              <li className="mb-2">
                <strong>Efficient Read Operations:</strong> Embedded documents reduce join operations, denormalized data improves read performance
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Frontend Integration</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
{`// src/services/incidentService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchIncidents = async (lat, lng, radius = 5000) => {
  const response = await axios.get(\`\${API_URL}/incidents/nearby\`, {
    params: { lat, lng, radius },
    headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
  });
  return response.data;
};

export const reportIncident = async (incidentData) => {
  const response = await axios.post(\`\${API_URL}/incidents\`, incidentData, {
    headers: { 
      Authorization: \`Bearer \${localStorage.getItem('token')}\`,
      'Content-Type': 'multipart/form-data' // For file uploads
    }
  });
  return response.data;
};`}
            </pre>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Deployment Architecture</h3>
            <p className="mb-2"><strong>Containerized Deployment:</strong></p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
{`docker-compose.yml
    - frontend (React container)
    - backend (Spring Boot container)
    - mongodb (MongoDB container)
    - mongo-express (Optional admin UI)`}
            </pre>
            
            <p className="mb-2"><strong>Production Deployment:</strong></p>
            <ul className="list-disc pl-5 mb-4">
              <li>Kubernetes cluster with separate pods for frontend, backend, MongoDB</li>
              <li>MongoDB Atlas for managed database service</li>
              <li>Cloud storage integration for evidence files (optional)</li>
            </ul>
            
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
