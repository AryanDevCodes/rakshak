
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
@Document(collection = "reports")
public class Report {
    
    @Id
    private String id;
    
    private String reportNumber;
    
    private String reportType;
    
    private String description;
    
    private String status; // new, approved, rejected, converted-to-case
    
    private String priority; // high, medium, low
    
    private String location;
    
    private String district;
    
    private String state;
    
    private double latitude;
    
    private double longitude;
    
    private String reportedBy; // User ID or anonymous
    
    private String reporterName;
    
    private String reporterContact;
    
    private boolean anonymous;
    
    private String reviewedBy;
    
    private String convertedCaseId;
    
    private List<String> attachments = new ArrayList<>();
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private LocalDateTime reviewedAt;
}
