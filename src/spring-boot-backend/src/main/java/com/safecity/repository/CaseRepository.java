
package com.safecity.repository;

import com.safecity.model.Case;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CaseRepository extends MongoRepository<Case, String> {
    
    Optional<Case> findByCaseNumber(String caseNumber);
    
    Page<Case> findByStatus(String status, Pageable pageable);
    
    Page<Case> findByAssignedTo(String assignedTo, Pageable pageable);
    
    @Query("{'district': ?0, 'status': ?1}")
    Page<Case> findByDistrictAndStatus(String district, String status, Pageable pageable);
    
    @Query("{'priority': ?0, 'status': ?1}")
    Page<Case> findByPriorityAndStatus(String priority, String status, Pageable pageable);
    
    @Query("{'createdAt': {$gte: ?0, $lte: ?1}}")
    List<Case> findByCaseCreatedBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("{'location': {$regex: ?0, $options: 'i'}}")
    Page<Case> findByLocationContaining(String location, Pageable pageable);
}
