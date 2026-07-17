package com.jsp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.backend.entity.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountId(Long accountId);
    List<Transaction> findBySenderAccountNoOrReciverAccountNo(Long senderAccountNo, Long reciverAccountNo);
}
