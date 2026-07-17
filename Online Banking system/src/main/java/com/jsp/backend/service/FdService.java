package com.jsp.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jsp.backend.dao.AccountDao;
import com.jsp.backend.dao.FdDao;
import com.jsp.backend.dto.request.FdRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Fd;
import com.jsp.backend.exception.DuplicateResourceException;
import com.jsp.backend.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FdService {

    private final FdDao fdDao;
    private final AccountDao accountDao;

    public ResponseEntity<ApiResponse<List<Fd>>> getAllFds() {
        List<Fd> fds = fdDao.findAll();
        ApiResponse<List<Fd>> body = new ApiResponse<>(HttpStatus.OK.value(), "FDs fetched successfully", fds);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Fd>> getById(Long id) {
        Fd fd = fdDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FD not found with id: " + id));
        ApiResponse<Fd> body = new ApiResponse<>(HttpStatus.OK.value(), "FD fetched successfully", fd);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Fd>> openFd(FdRequestDto request) {
        // Mirrors Fd.jsx: the account must already exist...
        if (!accountDao.existsByAccountNumber(request.getAccountNumber())) {
            throw new ResourceNotFoundException(
                    "Account not found. Please create an account first: " + request.getAccountNumber());
        }
        // ...and only one FD is allowed per account number.
        if (fdDao.existsByAccountNumber(request.getAccountNumber())) {
            throw new DuplicateResourceException(
                    "An FD already exists for account number " + request.getAccountNumber());
        }

        Fd fd = Fd.builder()
                .customerName(request.getCustomerName())
                .accountNumber(request.getAccountNumber())
                .panNumber(request.getPanNumber())
                .mobileNumber(request.getMobileNumber())
                .depositAmount(request.getDepositAmount())
                .tenure(request.getTenure())
                .interestPayout(request.getInterestPayout())
                .nomineeName(request.getNomineeName())
                .relationshipWithNominee(request.getRelationshipWithNominee())
                .build();
        Fd saved = fdDao.save(fd);

        ApiResponse<Fd> body = new ApiResponse<>(HttpStatus.CREATED.value(), "FD opened successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }
}
