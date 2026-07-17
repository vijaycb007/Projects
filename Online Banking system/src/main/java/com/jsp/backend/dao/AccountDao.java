package com.jsp.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.jsp.backend.entity.Account;
import com.jsp.backend.repository.AccountRepository;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class AccountDao {

    private final AccountRepository accountRepository;

    public Account save(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    public Optional<Account> findById(Long id) {
        return accountRepository.findById(id);
    }

    public List<Account> findByAccountNumber(Long accountNumber) {
        return accountRepository.findByAccountNumberEquals(accountNumber);
    }

    public boolean existsByAccountNumber(Long accountNumber) {
        return accountRepository.existsByAccountNumber(accountNumber);
    }

    public void deleteById(Long id) {
        accountRepository.deleteById(id);
    }
}
