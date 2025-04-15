
package com.safecity.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class IncidentUpdate {
    
    private String id;
    
    private String content;
    
    private String status;
    
    private String updatedBy;
    
    private LocalDateTime timestamp;
}
