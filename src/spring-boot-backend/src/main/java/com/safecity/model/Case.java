
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
@Document(collection = "cases")
public class Case {
    
    @Id
    private String id;
    
    private String caseNumber;
    
    private String title;
    
    private String description;
    
    private String status; // new, in-progress, resolved, closed
    
    private String priority; // high, medium, low
    
    private String type;
    
    private String location;
    
    private String district;
    
    private String state;
    
    private double latitude;
    
    private double longitude;
    
    private String complainant;
    
    private String complainantContact;
    
    private String assignedTo;
    
    private List<CaseNote> notes = new ArrayList<>();
    
    private List<String> attachments = new ArrayList<>();
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private LocalDateTime reportedAt;
    
    private LocalDateTime resolvedAt;
}
