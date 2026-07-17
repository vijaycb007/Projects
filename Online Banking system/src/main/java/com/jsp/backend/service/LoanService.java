package com.jsp.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jsp.backend.dao.AccountDao;
import com.jsp.backend.dao.LoanDao;
import com.jsp.backend.dto.request.LoanRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Account;
import com.jsp.backend.entity.Loan;
import com.jsp.backend.exception.InvalidRequestException;
import com.jsp.backend.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoanService {

    private static final Map<String, Double> LOAN_RATES = new HashMap<>();
    static {
        LOAN_RATES.put("Personal Loan", 11.5);
        LOAN_RATES.put("Home Loan", 8.65);
        LOAN_RATES.put("Vehicle Loan", 9.25);
        LOAN_RATES.put("Education Loan", 10.1);
    }

    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("M/d/yyyy, h:mm:ss a");

    private final LoanDao loanDao;
    private final AccountDao accountDao;

    public ResponseEntity<ApiResponse<List<Loan>>> getAllLoans() {
        List<Loan> loans = loanDao.findAll();
        ApiResponse<List<Loan>> body = new ApiResponse<>(HttpStatus.OK.value(), "Loans fetched successfully", loans);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Loan>> getById(Long id) {
        Loan loan = findOrThrow(id);
        ApiResponse<Loan> body = new ApiResponse<>(HttpStatus.OK.value(), "Loan fetched successfully", loan);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Loan>> applyForLoan(LoanRequestDto request) {
        List<Account> matches = accountDao.findByAccountNumber(Long.valueOf(request.getAccountNumber()));
        if (matches.isEmpty()) {
            throw new ResourceNotFoundException("Account number not found: " + request.getAccountNumber());
        }
        Account account = matches.get(0);

        double amount = Double.parseDouble(request.getAmount());
        if (amount < 10000) {
            throw new InvalidRequestException("Minimum loan amount is Rs. 10,000");
        }

        Double rate = LOAN_RATES.get(request.getLoanType());
        if (rate == null) {
            throw new InvalidRequestException("Unsupported loan type: " + request.getLoanType());
        }

        int tenureMonths = Integer.parseInt(request.getTenure());
        long estimatedEmi = calculateEmi(amount, rate, tenureMonths);
        double income = Double.parseDouble(request.getIncome());

        Loan loan = Loan.builder()
                .applicantName(request.getApplicantName())
                .accountNumber(request.getAccountNumber())
                .loanType(request.getLoanType())
                .amount(request.getAmount())
                .tenure(request.getTenure())
                .income(request.getIncome())
                .purpose(request.getPurpose())
                .accountId(account.getId())
                .accountName(account.getAccName())
                .rate(rate)
                .estimatedEmi(estimatedEmi)
                .status(income >= estimatedEmi * 3 ? "Pre-approved" : "Under Review")
                .appliedAt(LocalDateTime.now().format(DATE_FORMAT))
                .build();
        Loan saved = loanDao.save(loan);

        ApiResponse<Loan> body = new ApiResponse<>(HttpStatus.CREATED.value(), "Loan application submitted successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponse<Loan>> updateStatus(Long id, String status) {
        Loan loan = findOrThrow(id);
        loan.setStatus(status);
        Loan saved = loanDao.save(loan);

        ApiResponse<Loan> body = new ApiResponse<>(HttpStatus.OK.value(), "Loan status updated successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Void>> deleteLoan(Long id) {
        findOrThrow(id);
        loanDao.deleteById(id);

        ApiResponse<Void> body = new ApiResponse<>(HttpStatus.OK.value(), "Loan deleted successfully", null);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    private Loan findOrThrow(Long id) {
        return loanDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found with id: " + id));
    }

    /** Same EMI formula as pages/Loans.jsx's `calculateEmi`. */
    private long calculateEmi(double principal, double annualRate, int months) {
        if (principal <= 0 || months <= 0) {
            return 0;
        }
        double monthlyRate = annualRate / 12 / 100;
        double factor = Math.pow(1 + monthlyRate, months);
        return Math.round((principal * monthlyRate * factor) / (factor - 1));
    }
}
