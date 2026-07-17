package com.jsp.backend.controller;

import com.jsp.backend.dto.request.AccountBalanceUpdateDto;
import com.jsp.backend.dto.request.AccountRequestDto;
import com.jsp.backend.dto.request.DepositWithdrawRequestDto;
import com.jsp.backend.dto.request.TransferRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Account;
import com.jsp.backend.service.AccountService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Account>>> getAccounts(
            @RequestParam(name = "AccountNumber", required = false) Long accountNumber) {
        if (accountNumber != null) {
            return accountService.getAccountsByAccountNumber(accountNumber);
        }
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Account>> getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Account>> createAccount(@Valid @RequestBody AccountRequestDto request) {
        return accountService.createAccount(request);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Account>> patchBalance(@PathVariable Long id,
                                                               @Valid @RequestBody AccountBalanceUpdateDto request) {
        return accountService.updateBalance(id, request.getInitialBalance());
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<ApiResponse<Account>> deposit(@PathVariable Long id,
                                                          @Valid @RequestBody DepositWithdrawRequestDto request) {
        return accountService.deposit(id, request);
    }

    @PostMapping("/{id}/withdraw")
    public ResponseEntity<ApiResponse<Account>> withdraw(@PathVariable Long id,
                                                           @Valid @RequestBody DepositWithdrawRequestDto request) {
        return accountService.withdraw(id, request);
    }

    @PostMapping("/{id}/transfer")
    public ResponseEntity<ApiResponse<Account>> transfer(@PathVariable Long id,
                                                           @Valid @RequestBody TransferRequestDto request) {
        return accountService.transfer(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@PathVariable Long id) {
        return accountService.deleteAccount(id);
    }
}
