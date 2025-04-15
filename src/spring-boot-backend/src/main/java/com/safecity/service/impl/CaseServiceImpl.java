
package com.safecity.service.impl;

import com.safecity.model.Case;
import com.safecity.model.CaseNote;
import com.safecity.payload.request.CaseRequest;
import com.safecity.repository.CaseRepository;
import com.safecity.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CaseServiceImpl implements CaseService {

    @Autowired
    private CaseRepository caseRepository;
    
    @Override
    public Page<Case> findAll(Pageable pageable) {
        return caseRepository.findAll(pageable);
    }
    
    @Override
    public Case findById(String id) {
        return caseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Case not found with id: " + id));
    }
    
    @Override
    public Case findByCaseNumber(String caseNumber) {
        return caseRepository.findByCaseNumber(caseNumber)
                .orElseThrow(() -> new RuntimeException("Case not found with case number: " + caseNumber));
    }
    
    @Override
    public Page<Case> findByStatus(String status, Pageable pageable) {
        return caseRepository.findByStatus(status, pageable);
    }
    
    @Override
    public Page<Case> findByAssignedTo(String assignedTo, Pageable pageable) {
        return caseRepository.findByAssignedTo(assignedTo, pageable);
    }
    
    @Override
    public Page<Case> findByDistrictAndStatus(String district, String status, Pageable pageable) {
        return caseRepository.findByDistrictAndStatus(district, status, pageable);
    }
    
    @Override
    public Page<Case> findByPriorityAndStatus(String priority, String status, Pageable pageable) {
        return caseRepository.findByPriorityAndStatus(priority, status, pageable);
    }
    
    @Override
    public List<Case> findByCaseCreatedBetween(LocalDateTime start, LocalDateTime end) {
        return caseRepository.findByCaseCreatedBetween(start, end);
    }
    
    @Override
    public Case save(Case caseObj) {
        return caseRepository.save(caseObj);
    }
    
    @Override
    public Case update(String id, CaseRequest caseRequest) {
        Case existingCase = findById(id);
        
        if (caseRequest.getTitle() != null) {
            existingCase.setTitle(caseRequest.getTitle());
        }
        if (caseRequest.getDescription() != null) {
            existingCase.setDescription(caseRequest.getDescription());
        }
        if (caseRequest.getStatus() != null) {
            existingCase.setStatus(caseRequest.getStatus());
            
            // Update resolved time if case is being marked as resolved
            if ("resolved".equals(caseRequest.getStatus())) {
                existingCase.setResolvedAt(LocalDateTime.now());
            }
        }
        if (caseRequest.getPriority() != null) {
            existingCase.setPriority(caseRequest.getPriority());
        }
        if (caseRequest.getType() != null) {
            existingCase.setType(caseRequest.getType());
        }
        if (caseRequest.getLocation() != null) {
            existingCase.setLocation(caseRequest.getLocation());
        }
        if (caseRequest.getDistrict() != null) {
            existingCase.setDistrict(caseRequest.getDistrict());
        }
        if (caseRequest.getState() != null) {
            existingCase.setState(caseRequest.getState());
        }
        if (caseRequest.getLatitude() != 0) {
            existingCase.setLatitude(caseRequest.getLatitude());
        }
        if (caseRequest.getLongitude() != 0) {
            existingCase.setLongitude(caseRequest.getLongitude());
        }
        if (caseRequest.getComplainant() != null) {
            existingCase.setComplainant(caseRequest.getComplainant());
        }
        if (caseRequest.getComplainantContact() != null) {
            existingCase.setComplainantContact(caseRequest.getComplainantContact());
        }
        if (caseRequest.getAssignedTo() != null) {
            existingCase.setAssignedTo(caseRequest.getAssignedTo());
        }
        
        return caseRepository.save(existingCase);
    }
    
    @Override
    public Case addNote(String id, CaseNote note) {
        Case existingCase = findById(id);
        note.setCreatedAt(LocalDateTime.now());
        existingCase.getNotes().add(note);
        return caseRepository.save(existingCase);
    }
    
    @Override
    public void deleteById(String id) {
        caseRepository.deleteById(id);
    }
}
