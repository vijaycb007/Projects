package com.jsp.backend.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsp.backend.dao.AccountDao;
import com.jsp.backend.dao.TransactionDao;
import com.jsp.backend.dto.request.AccountRequestDto;
import com.jsp.backend.dto.request.DepositWithdrawRequestDto;
import com.jsp.backend.dto.request.TransferRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Account;
import com.jsp.backend.entity.Transaction;
import com.jsp.backend.exception.DuplicateResourceException;
import com.jsp.backend.exception.InsufficientBalanceException;
import com.jsp.backend.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("M/d/yyyy, h:mm:ss a");

    private final AccountDao accountDao;
    private final TransactionDao transactionDao;

    public ResponseEntity<ApiResponse<List<Account>>> getAllAccounts() {
        List<Account> accounts = accountDao.findAll();
        ApiResponse<List<Account>> body = new ApiResponse<>(HttpStatus.OK.value(), "Accounts fetched successfully", accounts);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Account>> getAccountById(Long id) {
        Account account = findAccountOrThrow(id);
        ApiResponse<Account> body = new ApiResponse<>(HttpStatus.OK.value(), "Account fetched successfully", account);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    /** Supports GET /accounts?AccountNumber=... used by AccountCard.jsx transfer lookup. */
    public ResponseEntity<ApiResponse<List<Account>>> getAccountsByAccountNumber(Long accountNumber) {
        List<Account> accounts = accountDao.findByAccountNumber(accountNumber);
        ApiResponse<List<Account>> body = new ApiResponse<>(HttpStatus.OK.value(), "Accounts fetched successfully", accounts);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse<Account>> createAccount(AccountRequestDto request) {
        Long accountNumber = request.getAccountNumber();

        if (accountNumber != null && accountDao.existsByAccountNumber(accountNumber)) {
            throw new DuplicateResourceException("Account number " + accountNumber + " is already in use");
        }
        if (accountNumber == null) {
            accountNumber = generateUniqueAccountNumber();
        }

        Account account = Account.builder()
                .accountNumber(accountNumber)
                .accName(request.getAccName())
                .accType(request.getAccType())
                .initialBalance(request.getInitialBalance())
                .build();
        Account saved = accountDao.save(account);

        ApiResponse<Account> body = new ApiResponse<>(HttpStatus.CREATED.value(), "Account created successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }

    /** Raw balance patch - kept for parity with AccountCard.jsx's direct PATCH call. */
    @Transactional
    public ResponseEntity<ApiResponse<Account>> updateBalance(Long id, double newBalance) {
        Account account = findAccountOrThrow(id);
        account.setInitialBalance(newBalance);
        Account saved = accountDao.save(account);

        ApiResponse<Account> body = new ApiResponse<>(HttpStatus.OK.value(), "Balance updated successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    /** Safer, validated deposit that also writes the transaction atomically. */
    @Transactional
    public ResponseEntity<ApiResponse<Account>> deposit(Long id, DepositWithdrawRequestDto request) {
        Account account = findAccountOrThrow(id);
        account.setInitialBalance(account.getInitialBalance() + request.getAmount());
        Account saved = accountDao.save(account);

        Transaction transaction = Transaction.builder()
                .accountId(saved.getId())
                .accountNumber(saved.getAccountNumber())
                .accountName(saved.getAccName())
                .amount(String.valueOf(request.getAmount()))
                .description(request.getDescription())
                .type("deposit")
                .date(now())
                .build();
        transactionDao.save(transaction);

        ApiResponse<Account> body = new ApiResponse<>(HttpStatus.OK.value(), "Amount deposited successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    /** Safer, validated withdrawal that also writes the transaction atomically. */
    @Transactional
    public ResponseEntity<ApiResponse<Account>> withdraw(Long id, DepositWithdrawRequestDto request) {
        Account account = findAccountOrThrow(id);

        if (account.getInitialBalance() < request.getAmount()) {
            throw new InsufficientBalanceException("Insufficient balance for this withdrawal");
        }

        account.setInitialBalance(account.getInitialBalance() - request.getAmount());
        Account saved = accountDao.save(account);

        Transaction transaction = Transaction.builder()
                .accountId(saved.getId())
                .accountNumber(saved.getAccountNumber())
                .accountName(saved.getAccName())
                .amount(String.valueOf(request.getAmount()))
                .description(request.getDescription())
                .type("withdraw")
                .date(now())
                .build();
        transactionDao.save(transaction);

        ApiResponse<Account> body = new ApiResponse<>(HttpStatus.OK.value(), "Amount withdrawn successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    /** Safer, validated transfer that also writes the transaction atomically. */
    @Transactional
    public ResponseEntity<ApiResponse<Account>> transfer(Long id, TransferRequestDto request) {
        Account sender = findAccountOrThrow(id);

        if (sender.getInitialBalance() < request.getAmount()) {
            throw new InsufficientBalanceException("Insufficient balance for this transfer");
        }

        List<Account> receivers = accountDao.findByAccountNumber(request.getReceiverAccountNumber());
        if (receivers.isEmpty()) {
            throw new ResourceNotFoundException(
                    "Receiver account not found with account number: " + request.getReceiverAccountNumber());
        }
        Account receiver = receivers.get(0);

        sender.setInitialBalance(sender.getInitialBalance() - request.getAmount());
        receiver.setInitialBalance(receiver.getInitialBalance() + request.getAmount());
        Account savedSender = accountDao.save(sender);
        accountDao.save(receiver);

        Transaction transaction = Transaction.builder()
                .senderAccountNo(savedSender.getAccountNumber())
                .senderName(savedSender.getAccName())
                .reciverAccountNo(receiver.getAccountNumber())
                .reciverName(request.getReceiverName())
                .amount(String.valueOf(request.getAmount()))
                .description(request.getDescription())
                .type("Transfer")
                .date(now())
                .build();
        transactionDao.save(transaction);

        ApiResponse<Account> body = new ApiResponse<>(HttpStatus.OK.value(), "Amount transferred successfully", savedSender);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteAccount(Long id) {
        Account account = findAccountOrThrow(id);

        List<Transaction> related = transactionDao.findRelatedToAccount(account.getId());
        related.forEach(t -> transactionDao.deleteById(t.getId()));

        accountDao.deleteById(id);

        ApiResponse<Void> body = new ApiResponse<>(HttpStatus.OK.value(), "Account deleted successfully", null);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    private Account findAccountOrThrow(Long id) {
        return accountDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
    }

    private Long generateUniqueAccountNumber() {
        long candidate;
        do {
            // 12-digit account number, mirrors CreateAccount.jsx's own generator.
            candidate = 100_000_000_000L + (long) (RANDOM.nextDouble() * 900_000_000_000L);
        } while (accountDao.existsByAccountNumber(candidate));
        return candidate;
    }

    private String now() {
        return LocalDateTime.now().format(DATE_FORMAT);
    }
}
