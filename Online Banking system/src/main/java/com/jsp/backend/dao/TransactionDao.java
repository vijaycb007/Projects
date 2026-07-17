package com.jsp.backend.dao;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.jsp.backend.entity.Transaction;
import com.jsp.backend.repository.TransactionRepository;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class TransactionDao {

    private final TransactionRepository transactionRepository;

    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> findById(Long id) {
        return transactionRepository.findById(id);
    }

    public List<Transaction> findByAccountId(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    public List<Transaction> findRelatedToAccount(Long accountId) {
        // Mirrors AccountCard.jsx's handleDelete: any transaction where this
        // account was the direct account, the sender, or the receiver.
        return transactionRepository.findAll().stream()
                .filter(t -> accountId.equals(t.getAccountId())
                        || accountId.equals(t.getSenderAccountNo())
                        || accountId.equals(t.getReciverAccountNo()))
                .collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        transactionRepository.deleteById(id);
    }
}
