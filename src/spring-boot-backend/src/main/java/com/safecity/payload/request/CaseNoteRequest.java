
package com.safecity.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CaseNoteRequest {
    
    @NotBlank(message = "Note content is required")
    private String content;
    
    private boolean internal;
}
