
package com.safecity.service.impl;

import com.safecity.model.User;
import com.safecity.repository.UserRepository;
import com.safecity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder encoder;
    
    @Override
    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
    
    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
    
    @Override
    public User createUser(String name, String email, String password, String role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(encoder.encode(password));
        user.setRole(role);
        
        // Set default permissions based on role
        Set<String> permissions = new HashSet<>();
        
        switch (role.toLowerCase()) {
            case "admin":
                permissions.add("user:read");
                permissions.add("user:write");
                permissions.add("case:read");
                permissions.add("case:write");
                permissions.add("report:read");
                permissions.add("report:write");
                permissions.add("incident:read");
                permissions.add("incident:write");
                permissions.add("analytics:read");
                break;
            case "officer":
                permissions.add("case:read");
                permissions.add("case:write");
                permissions.add("report:read");
                permissions.add("report:write");
                permissions.add("incident:read");
                permissions.add("incident:write");
                break;
            case "user":
                permissions.add("report:create");
                permissions.add("report:read-own");
                break;
            default:
                break;
        }
        
        user.setPermissions(permissions);
        
        // Generate badge number for officers and admins
        if ("officer".equalsIgnoreCase(role) || "admin".equalsIgnoreCase(role)) {
            user.setBadgeNumber(generateBadgeNumber());
        }
        
        return userRepository.save(user);
    }
    
    private String generateBadgeNumber() {
        // Simple badge number generation
        return "SC" + System.currentTimeMillis() % 100000;
    }
    
    @Override
    public User update(String id, User userDetails) {
        User user = findById(id);
        
        user.setName(userDetails.getName());
        if (userDetails.getPhone() != null) {
            user.setPhone(userDetails.getPhone());
        }
        if (userDetails.getDepartment() != null) {
            user.setDepartment(userDetails.getDepartment());
        }
        if (userDetails.getAvatar() != null) {
            user.setAvatar(userDetails.getAvatar());
        }
        
        return userRepository.save(user);
    }
    
    @Override
    public User updateRole(String id, String role) {
        User user = findById(id);
        user.setRole(role);
        
        // Update permissions based on the new role
        Set<String> permissions = new HashSet<>();
        
        switch (role.toLowerCase()) {
            case "admin":
                permissions.add("user:read");
                permissions.add("user:write");
                permissions.add("case:read");
                permissions.add("case:write");
                permissions.add("report:read");
                permissions.add("report:write");
                permissions.add("incident:read");
                permissions.add("incident:write");
                permissions.add("analytics:read");
                break;
            case "officer":
                permissions.add("case:read");
                permissions.add("case:write");
                permissions.add("report:read");
                permissions.add("report:write");
                permissions.add("incident:read");
                permissions.add("incident:write");
                break;
            case "user":
                permissions.add("report:create");
                permissions.add("report:read-own");
                break;
        }
        
        user.setPermissions(permissions);
        
        // Generate badge number if not exists and new role is officer or admin
        if (user.getBadgeNumber() == null && ("officer".equalsIgnoreCase(role) || "admin".equalsIgnoreCase(role))) {
            user.setBadgeNumber(generateBadgeNumber());
        }
        
        return userRepository.save(user);
    }
    
    @Override
    public void deleteById(String id) {
        User user = findById(id);
        userRepository.delete(user);
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    @Override
    public List<User> findUsersByRole(String role) {
        return userRepository.findAll().stream()
                .filter(user -> role.equalsIgnoreCase(user.getRole()))
                .collect(Collectors.toList());
    }
}
