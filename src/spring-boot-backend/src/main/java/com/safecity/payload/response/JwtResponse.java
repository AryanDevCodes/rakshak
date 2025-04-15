
package com.safecity.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class JwtResponse {
    
    private String token;
    private String id;
    private String name;
    private String email;
    private String badge;
    private List<String> roles;
}
