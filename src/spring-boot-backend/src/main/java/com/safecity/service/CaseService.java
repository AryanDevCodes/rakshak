
package com.safecity.service;

import com.safecity.model.Case;
import com.safecity.model.CaseNote;
import com.safecity.payload.request.CaseRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface CaseService {
    
    Page<Case> findAll(Pageable pageable);
    
    Case findById(String id);
    
    Case findByCaseNumber(String caseNumber);
    
    Page<Case> findByStatus(String status, Pageable pageable);
    
    Page<Case> findByAssignedTo(String assignedTo, Pageable pageable);
    
    Page<Case> findByDistrictAndStatus(String district, String status, Pageable pageable);
    
    Page<Case> findByPriorityAndStatus(String priority, String status, Pageable pageable);
    
    List<Case> findByCaseCreatedBetween(LocalDateTime start, LocalDateTime end);
    
    Case save(Case caseObj);
    
    Case update(String id, CaseRequest caseRequest);
    
    Case addNote(String id, CaseNote note);
    
    void deleteById(String id);
}
