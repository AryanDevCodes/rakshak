
package com.safecity.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CaseNote {
    
    private String id;
    
    private String content;
    
    private String createdBy;
    
    private LocalDateTime createdAt;
    
    private boolean internal; // Indicates if it's an internal note or can be shared with complainant
}
