package com.jsp.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jsp.backend.dao.TransactionDao;
import com.jsp.backend.dto.request.TransactionRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Transaction;
import com.jsp.backend.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransactionService {

    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("M/d/yyyy, h:mm:ss a");

    private final TransactionDao transactionDao;

    public ResponseEntity<ApiResponse<List<Transaction>>> getAllTransactions() {
        List<Transaction> transactions = transactionDao.findAll();
        ApiResponse<List<Transaction>> body =
                new ApiResponse<>(HttpStatus.OK.value(), "Transactions fetched successfully", transactions);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Transaction>> getById(Long id) {
        Transaction transaction = findOrThrow(id);
        ApiResponse<Transaction> body =
                new ApiResponse<>(HttpStatus.OK.value(), "Transaction fetched successfully", transaction);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Transaction>> createTransaction(TransactionRequestDto request) {
        Transaction transaction = Transaction.builder()
                .accountId(request.getAccountId())
                .accountNumber(request.getAccountNumber())
                .accountName(request.getAccountName())
                .senderAccountNo(request.getSenderAccountNo())
                .senderName(request.getSenderName())
                .reciverAccountNo(request.getReciverAccountNo())
                .reciverName(request.getReciverName())
                .amount(request.getAmount())
                .description(request.getDescription())
                .type(request.getType())
                .date(request.getDate() != null ? request.getDate() : LocalDateTime.now().format(DATE_FORMAT))
                .build();
        Transaction saved = transactionDao.save(transaction);

        ApiResponse<Transaction> body =
                new ApiResponse<>(HttpStatus.CREATED.value(), "Transaction created successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponse<Void>> deleteTransaction(Long id) {
        findOrThrow(id);
        transactionDao.deleteById(id);

        ApiResponse<Void> body = new ApiResponse<>(HttpStatus.OK.value(), "Transaction deleted successfully", null);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    private Transaction findOrThrow(Long id) {
        return transactionDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));
    }
}
