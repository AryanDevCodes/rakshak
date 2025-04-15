
package com.safecity.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CaseRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    private String status;
    
    @NotBlank(message = "Priority is required")
    private String priority;
    
    @NotBlank(message = "Type is required")
    private String type;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    private String district;
    
    private String state;
    
    private double latitude;
    
    private double longitude;
    
    @NotBlank(message = "Complainant name is required")
    private String complainant;
    
    private String complainantContact;
    
    private String assignedTo;
}
