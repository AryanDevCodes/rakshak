
package com.safecity.service;

import com.safecity.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    
    User findById(String id);
    
    User findByEmail(String email);
    
    Page<User> findAll(Pageable pageable);
    
    User createUser(String name, String email, String password, String role);
    
    User update(String id, User userDetails);
    
    User updateRole(String id, String role);
    
    void deleteById(String id);
    
    boolean existsByEmail(String email);
    
    List<User> findUsersByRole(String role);
}
