package com.jsp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.backend.entity.Account;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(Long accountNumber);
    List<Account> findByAccountNumberEquals(Long accountNumber);
    boolean existsByAccountNumber(Long accountNumber);
}
