
# SafeCity API Backend

This Spring Boot application serves as the backend for the SafeCity portal, providing RESTful APIs for case management, user authentication, report submission, and incident tracking.

## Getting Started

### Prerequisites
- JDK 21
- Maven 3.8+
- MongoDB (local or Atlas)

### Setup
1. Clone the repository
2. Configure MongoDB connection in `application.properties`
3. Run the application using Maven:
   ```
   mvn spring-boot:run
   ```

## API Documentation

### Authentication
- POST /api/auth/signin - Authenticate user
- POST /api/auth/signup - Register new user
- GET /api/auth/user - Get current user information

### Cases
- GET /api/cases - Get all cases with pagination
- GET /api/cases/{id} - Get case by ID
- POST /api/cases - Create new case
- PUT /api/cases/{id} - Update case
- DELETE /api/cases/{id} - Delete case
- POST /api/cases/{id}/notes - Add note to case

### Reports
- GET /api/reports - Get all reports
- GET /api/reports/{id} - Get report by ID
- POST /api/reports - Create new report
- PUT /api/reports/{id}/approve - Approve report
- PUT /api/reports/{id}/reject - Reject report

### Incidents
- GET /api/incidents - Get all incidents
- GET /api/incidents/{id} - Get incident by ID
- POST /api/incidents - Create new incident
- PUT /api/incidents/{id} - Update incident
- DELETE /api/incidents/{id} - Delete incident

### Users
- GET /api/users - Get all users (admin only)
- GET /api/users/{id} - Get user by ID
- PUT /api/users/{id} - Update user
- PUT /api/users/{id}/role - Update user role
- DELETE /api/users/{id} - Delete user

## Security

This API uses JWT-based authentication. Include the JWT token in the Authorization header for protected endpoints:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200 OK - Request succeeded
- 201 Created - Resource created
- 400 Bad Request - Invalid input
- 401 Unauthorized - Authentication required
- 403 Forbidden - Insufficient permissions
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server error

## Data Models

### User
- id: String
- name: String
- email: String
- password: String (encrypted)
- role: String (user, officer, admin)
- badgeNumber: String (for officers)

### Case
- id: String
- caseNumber: String
- title: String
- description: String
- status: String (new, in-progress, resolved)
- priority: String (high, medium, low)
- location: String
- district: String
- assignedTo: String (User ID)
- notes: List<CaseNote>

### Report
- id: String
- reportNumber: String
- reportType: String
- description: String
- status: String (new, approved, rejected)
- location: String
- reportedBy: String (User ID or anonymous)
