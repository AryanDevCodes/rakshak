
package com.safecity.repository;

import com.safecity.model.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReportRepository extends MongoRepository<Report, String> {
    
    Optional<Report> findByReportNumber(String reportNumber);
    
    Page<Report> findByStatus(String status, Pageable pageable);
    
    Page<Report> findByReportedBy(String reportedBy, Pageable pageable);
    
    @Query("{'district': ?0, 'status': ?1}")
    Page<Report> findByDistrictAndStatus(String district, String status, Pageable pageable);
    
    @Query("{'priority': ?0, 'status': ?1}")
    Page<Report> findByPriorityAndStatus(String priority, String status, Pageable pageable);
    
    @Query("{'createdAt': {$gte: ?0, $lte: ?1}}")
    List<Report> findByReportCreatedBetween(LocalDateTime start, LocalDateTime end);
    
    Page<Report> findByAnonymous(boolean anonymous, Pageable pageable);
    
    @Query("{'location': {$regex: ?0, $options: 'i'}}")
    Page<Report> findByLocationContaining(String location, Pageable pageable);
}
