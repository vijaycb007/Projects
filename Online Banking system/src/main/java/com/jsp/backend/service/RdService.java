package com.jsp.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jsp.backend.dao.AccountDao;
import com.jsp.backend.dao.RdDao;
import com.jsp.backend.dto.request.RdRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Rd;
import com.jsp.backend.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RdService {

    private static final double INTEREST_RATE = 6.8;
    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("M/d/yyyy, h:mm:ss a");

    private final RdDao rdDao;
    private final AccountDao accountDao;

    public ResponseEntity<ApiResponse<List<Rd>>> getAllRds() {
        List<Rd> rds = rdDao.findAll();
        ApiResponse<List<Rd>> body = new ApiResponse<>(HttpStatus.OK.value(), "RDs fetched successfully", rds);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Rd>> getById(Long id) {
        Rd rd = rdDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RD not found with id: " + id));
        ApiResponse<Rd> body = new ApiResponse<>(HttpStatus.OK.value(), "RD fetched successfully", rd);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Rd>> openRd(RdRequestDto request) {
        if (!accountDao.existsByAccountNumber(request.getAccountNumber())) {
            throw new ResourceNotFoundException(
                    "Account not found. Please create an account first: " + request.getAccountNumber());
        }

        double monthlyDeposit = request.getMonthlyDeposit();
        int months = Integer.parseInt(request.getTenure());
        double maturityAmount = calculateMaturityAmount(monthlyDeposit, months);

        Rd rd = Rd.builder()
                .customerName(request.getCustomerName())
                .accountNumber(request.getAccountNumber())
                .monthlyDeposit(monthlyDeposit)
                .tenure(request.getTenure())
                .nomineeName(request.getNomineeName())
                .relationshipWithNominee(request.getRelationshipWithNominee())
                .interestRate(INTEREST_RATE)
                .maturityAmount(maturityAmount)
                .createdAt(LocalDateTime.now().format(DATE_FORMAT))
                .build();
        Rd saved = rdDao.save(rd);

        ApiResponse<Rd> body = new ApiResponse<>(HttpStatus.CREATED.value(), "RD opened successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }

    /** Same formula as DepositFolder/Rd.jsx's `maturityAmount` useMemo. */
    private double calculateMaturityAmount(double monthlyDeposit, int months) {
        double totalDeposit = monthlyDeposit * months;
        double interest = totalDeposit * (INTEREST_RATE / 100) * ((months + 1) / 24.0);
        return Math.round(totalDeposit + interest);
    }
}
