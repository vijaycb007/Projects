package com.jsp.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.backend.dto.request.LoanRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Loan;
import com.jsp.backend.service.LoanService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/loans")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@AllArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Loan>>> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Loan>> getById(@PathVariable Long id) {
        return loanService.getById(id);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Loan>> applyForLoan(@Valid @RequestBody LoanRequestDto request) {
        return loanService.applyForLoan(request);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Loan>> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return loanService.updateStatus(id, body.get("status"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLoan(@PathVariable Long id) {
        return loanService.deleteLoan(id);
    }
}
