
package com.safecity.repository;

import com.safecity.model.Incident;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IncidentRepository extends MongoRepository<Incident, String> {
    
    Optional<Incident> findByIncidentNumber(String incidentNumber);
    
    Page<Incident> findByStatus(String status, Pageable pageable);
    
    Page<Incident> findByLeadResponder(String leadResponder, Pageable pageable);
    
    @Query("{'responders': ?0}")
    Page<Incident> findByResponders(String responder, Pageable pageable);
    
    @Query("{'district': ?0, 'status': ?1}")
    Page<Incident> findByDistrictAndStatus(String district, String status, Pageable pageable);
    
    @Query("{'severity': ?0, 'status': ?1}")
    Page<Incident> findBySeverityAndStatus(String severity, String status, Pageable pageable);
    
    @Query("{'createdAt': {$gte: ?0, $lte: ?1}}")
    List<Incident> findByIncidentCreatedBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("{'location': {$regex: ?0, $options: 'i'}}")
    Page<Incident> findByLocationContaining(String location, Pageable pageable);
}
