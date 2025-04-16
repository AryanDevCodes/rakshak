
package com.safecity.config;

import com.safecity.model.User;
import com.safecity.model.Case;
import com.safecity.model.Report;
import com.safecity.repository.UserRepository;
import com.safecity.repository.CaseRepository;
import com.safecity.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Only seed if collections are empty
        if (userRepository.count() == 0) {
            seedUsers();
        }
        if (caseRepository.count() == 0) {
            seedCases();
        }
        if (reportRepository.count() == 0) {
            seedReports();
        }
    }

    private void seedUsers() {
        // Create 10 users with different roles
        List<User> users = Arrays.asList(
            createUser("Admin User", "admin@safecity.com", "admin123", "admin", "AD001"),
            createUser("Officer One", "officer1@safecity.com", "officer123", "officer", "OF001"),
            createUser("Officer Two", "officer2@safecity.com", "officer123", "officer", "OF002"),
            createUser("User One", "user1@safecity.com", "user123", "user", null),
            createUser("User Two", "user2@safecity.com", "user123", "user", null),
            createUser("Officer Three", "officer3@safecity.com", "officer123", "officer", "OF003"),
            createUser("Officer Four", "officer4@safecity.com", "officer123", "officer", "OF004"),
            createUser("User Three", "user3@safecity.com", "user123", "user", null),
            createUser("User Four", "user4@safecity.com", "user123", "user", null),
            createUser("Supervisor", "supervisor@safecity.com", "super123", "admin", "AD002")
        );
        
        userRepository.saveAll(users);
    }

    private User createUser(String name, String email, String password, String role, String badgeNumber) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setBadgeNumber(badgeNumber);
        user.setActive(true);
        return user;
    }

    private void seedCases() {
        // Create 10 cases
        List<String> districts = Arrays.asList("North", "South", "East", "West", "Central");
        List<String> statuses = Arrays.asList("new", "in-progress", "resolved", "closed");
        List<String> priorities = Arrays.asList("high", "medium", "low");
        
        for (int i = 0; i < 10; i++) {
            Case caseObj = new Case();
            caseObj.setCaseNumber("CASE-2024-" + String.format("%03d", i + 1));
            caseObj.setTitle("Sample Case " + (i + 1));
            caseObj.setDescription("This is a sample case description for case " + (i + 1));
            caseObj.setStatus(statuses.get(i % statuses.size()));
            caseObj.setPriority(priorities.get(i % priorities.size()));
            caseObj.setDistrict(districts.get(i % districts.size()));
            caseObj.setCreatedAt(LocalDateTime.now().minusDays(i));
            caseObj.setLocation("Location " + (i + 1));
            
            caseRepository.save(caseObj);
        }
    }

    private void seedReports() {
        // Create 2 reports
        List<Report> reports = Arrays.asList(
            createReport("Suspicious Activity Report", "REPORT-2024-001", "new"),
            createReport("Traffic Incident Report", "REPORT-2024-002", "in-progress")
        );
        
        reportRepository.saveAll(reports);
    }

    private Report createReport(String title, String reportNumber, String status) {
        Report report = new Report();
        report.setTitle(title);
        report.setReportNumber(reportNumber);
        report.setStatus(status);
        report.setDescription("This is a sample report description");
        report.setCreatedAt(LocalDateTime.now());
        return report;
    }
}
