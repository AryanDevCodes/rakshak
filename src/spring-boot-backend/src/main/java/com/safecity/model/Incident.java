
package com.safecity.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "incidents")
public class Incident {
    
    @Id
    private String id;
    
    private String incidentNumber;
    
    private String title;
    
    private String description;
    
    private String incidentType;
    
    private String severity; // critical, major, minor
    
    private String status; // active, contained, resolved
    
    private String location;
    
    private String district;
    
    private String state;
    
    private double latitude;
    
    private double longitude;
    
    private String reportedBy;
    
    private List<String> responders = new ArrayList<>();
    
    private String leadResponder;
    
    private List<String> attachments = new ArrayList<>();
    
    private List<IncidentUpdate> updates = new ArrayList<>();
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private LocalDateTime reportedAt;
    
    private LocalDateTime resolvedAt;
}
