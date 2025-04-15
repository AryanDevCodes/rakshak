
# Spring Boot Backend Integration for Safe City Project

This document outlines how to integrate a Spring Boot backend with the React frontend for the Safe City application.

## Setup Instructions

### Prerequisites
- JDK 17 or higher
- Maven 3.8+ or Gradle 7+
- MySQL/PostgreSQL database
- Spring Boot 3.0+

### Project Structure

```
spring-boot-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── safecity/
│   │   │           ├── SafeCityApplication.java
│   │   │           ├── controller/
│   │   │           │   ├── CaseController.java
│   │   │           │   ├── UserController.java
│   │   │           │   └── ReportController.java
│   │   │           ├── model/
│   │   │           │   ├── Case.java
│   │   │           │   ├── User.java
│   │   │           │   └── Report.java
│   │   │           ├── repository/
│   │   │           │   ├── CaseRepository.java
│   │   │           │   ├── UserRepository.java
│   │   │           │   └── ReportRepository.java
│   │   │           ├── service/
│   │   │           │   ├── CaseService.java
│   │   │           │   ├── UserService.java
│   │   │           │   └── ReportService.java
│   │   │           └── security/
│   │   │               └── JwtAuthenticationFilter.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## API Endpoints

### Authentication
- `POST /api/auth/login`: Authenticate users
- `POST /api/auth/register`: Register new users
- `GET /api/auth/user`: Get current user information

### Cases
- `GET /api/cases`: Get all cases (with pagination and filtering)
- `GET /api/cases/{id}`: Get case by ID
- `POST /api/cases`: Create new case
- `PUT /api/cases/{id}`: Update existing case
- `DELETE /api/cases/{id}`: Delete case
- `POST /api/cases/{id}/notes`: Add note to case

### Reports
- `GET /api/reports`: Get all reports
- `GET /api/reports/{id}`: Get report by ID
- `POST /api/reports`: Submit new report
- `PUT /api/reports/{id}/approve`: Approve report
- `PUT /api/reports/{id}/reject`: Reject report

### Users
- `GET /api/users`: Get all users (admin only)
- `GET /api/users/{id}`: Get user by ID
- `PUT /api/users/{id}`: Update user
- `PUT /api/users/{id}/role`: Update user role

## Integration with React Frontend

1. Create API service files in the React project
2. Configure CORS in Spring Boot backend
3. Set up JWT token-based authentication
4. Implement API calls in React components

## Example Spring Boot Application Properties

```properties
# Server configuration
server.port=8080

# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/safecity
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# JWT configuration
app.jwt.secret=your_jwt_secret_key_here
app.jwt.expiration=86400000

# File upload configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Logging configuration
logging.level.org.springframework.web=INFO
logging.level.com.safecity=DEBUG
```

## Security Configuration

Ensure proper role-based access controls:
- Public endpoints: login, register, emergency reports
- Officer endpoints: case management, reports view
- Admin endpoints: user management, analytics

## Database Schema

The database should include tables for users, cases, case notes, reports, and incidents with proper relationships and constraints.

## Cross-Origin Resource Sharing (CORS)

Configure CORS to allow requests from the React application:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```
