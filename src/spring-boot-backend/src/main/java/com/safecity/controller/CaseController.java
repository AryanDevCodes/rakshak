
package com.safecity.controller;

import com.safecity.model.Case;
import com.safecity.model.CaseNote;
import com.safecity.payload.request.CaseNoteRequest;
import com.safecity.payload.request.CaseRequest;
import com.safecity.payload.response.MessageResponse;
import com.safecity.security.UserDetailsImpl;
import com.safecity.service.CaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/cases")
public class CaseController {

    @Autowired
    private CaseService caseService;

    @GetMapping
    @PreAuthorize("hasRole('OFFICER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAllCases(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String assignedTo,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        Page<Case> casesPage;
        
        if (status != null && district != null) {
            casesPage = caseService.findByDistrictAndStatus(district, status, pageable);
        } else if (status != null && priority != null) {
            casesPage = caseService.findByPriorityAndStatus(priority, status, pageable);
        } else if (status != null) {
            casesPage = caseService.findByStatus(status, pageable);
        } else if (assignedTo != null) {
            casesPage = caseService.findByAssignedTo(assignedTo, pageable);
        } else {
            casesPage = caseService.findAll(pageable);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("cases", casesPage.getContent());
        response.put("currentPage", casesPage.getNumber());
        response.put("totalItems", casesPage.getTotalElements());
        response.put("totalPages", casesPage.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('OFFICER') or hasRole('ADMIN')")
    public ResponseEntity<?> getCaseById(@PathVariable String id) {
        return ResponseEntity.ok(caseService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('OFFICER') or hasRole('ADMIN')")
    public ResponseEntity<?> createCase(@Valid @RequestBody CaseRequest caseRequest, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        Case newCase = new Case();
        newCase.setCaseNumber("FIR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        newCase.setTitle(caseRequest.getTitle());
        newCase.setDescription(caseRequest.getDescription());
        newCase.setStatus("new");
        newCase.setPriority(caseRequest.getPriority());
        newCase.setType(caseRequest.getType());
        newCase.setLocation(caseRequest.getLocation());
        newCase.setDistrict(caseRequest.getDistrict());
        newCase.setState(caseRequest.getState());
        newCase.setLatitude(caseRequest.getLatitude());
        newCase.setLongitude(caseRequest.getLongitude());
        newCase.setComplainant(caseRequest.getComplainant());
        newCase.setComplainantContact(caseRequest.getComplainantContact());
        newCase.setAssignedTo(caseRequest.getAssignedTo() != null ? caseRequest.getAssignedTo() : userDetails.getId());
        
        Case savedCase = caseService.save(newCase);
        return ResponseEntity.ok(savedCase);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OFFICER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateCase(@PathVariable String id, @Valid @RequestBody CaseRequest caseRequest) {
        Case updatedCase = caseService.update(id, caseRequest);
        return ResponseEntity.ok(updatedCase);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCase(@PathVariable String id) {
        caseService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Case deleted successfully"));
    }

    @PostMapping("/{id}/notes")
    @PreAuthorize("hasRole('OFFICER') or hasRole('ADMIN')")
    public ResponseEntity<?> addCaseNote(@PathVariable String id, @Valid @RequestBody CaseNoteRequest noteRequest, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        CaseNote note = new CaseNote();
        note.setId(UUID.randomUUID().toString());
        note.setContent(noteRequest.getContent());
        note.setCreatedBy(userDetails.getId());
        note.setInternal(noteRequest.isInternal());
        
        Case updatedCase = caseService.addNote(id, note);
        return ResponseEntity.ok(updatedCase);
    }
}
